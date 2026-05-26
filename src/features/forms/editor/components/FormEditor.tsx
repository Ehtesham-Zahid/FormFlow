"use client";

import { useRef, useState, useEffect } from "react";
import { EditorState } from "../types/editor.types";
import FieldRenderer from "./FieldRenderer";
import GhostInputArea from "./GhostInputArea";
import { Button } from "@/src/components/ui/button";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableField from "./SortableField";


type Props = {
  state: EditorState;
  dispatch: React.Dispatch<any>;
  saveStatus: "idle" | "saving" | "saved";
};

export default function FormEditor({ state, dispatch, saveStatus }: Props) {
  // Map of fieldId → label <input> element
  const fieldRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const ghostRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = state.fields.findIndex((f) => f.id === active.id);
    const toIndex = state.fields.findIndex((f) => f.id === over.id);

    if (fromIndex !== -1 && toIndex !== -1) {
      dispatch({
        type: "REORDER_FIELDS",
        payload: { fromIndex, toIndex },
      });
    }
  };

  // null = no ghost input visible
  // 0 = ghost appears before field 0 (after title)
  // 1 = ghost appears after field 0 (before field 1)
  // N = ghost appears after field N-1
  const [ghostIndex, setGhostIndex] = useState<number | null>(null);

  // Auto-focus positional ghost input when it appears
  useEffect(() => {
    if (ghostIndex !== null) {
      setTimeout(() => {
        ghostRef.current?.focus();
      }, 0);
    }
  }, [ghostIndex]);

  const setFieldRef = (fieldId: string) => (el: HTMLInputElement | null) => {
    if (el) {
      fieldRefs.current.set(fieldId, el);
    }
    else {
      fieldRefs.current.delete(fieldId);
    }
  };

  // Called when Enter is pressed inside any field label input
  const handleEnter = (fieldId: string) => {
    const idx = state.fields.findIndex((f) => f.id === fieldId);
    if (idx !== -1) {
      setGhostIndex(idx + 1);
    }
  };

  // Called by GhostInputArea after INSERT_FIELD_AT dispatches.
  const handleFieldCreated = (fieldId: string) => {
    setGhostIndex(null);
    setTimeout(() => {
      fieldRefs.current.get(fieldId)?.focus();
    }, 0);
  };

  // Called when Escape is pressed on the positional ghost input or click outside
  const handleGhostEscape = () => {
    const prevIndex = ghostIndex;
    setGhostIndex(null);
    if (prevIndex === 0) {
      titleRef.current?.focus();
    } else if (prevIndex !== null) {
      const prevField = state.fields[prevIndex - 1];
      if (prevField) {
        setTimeout(() => {
          fieldRefs.current.get(prevField.id)?.focus();
        }, 0);
      }
    }
  };

  // Called when Backspace is pressed on an empty field label input
  const handleBackspaceDelete = (fieldId: string) => {
    const idx = state.fields.findIndex((f) => f.id === fieldId);
    // Capture prev field id BEFORE dispatching — state.fields changes after dispatch
    const prevField = idx > 0 ? state.fields[idx - 1] : null;

    dispatch({ type: "DELETE_FIELD", payload: { id: fieldId } });

    setTimeout(() => {
      if (prevField) {
        fieldRefs.current.get(prevField.id)?.focus();
      } else {
        titleRef.current?.focus();
      }
    }, 0);
  };

  // Called when Duplicate is clicked in the field popover
  const handleDuplicate = (fieldId: string) => {
    const idx = state.fields.findIndex((f) => f.id === fieldId);
    if (idx === -1) return;
    const original = state.fields[idx];
    const newField = { ...original, id: crypto.randomUUID() };
    dispatch({
      type: "INSERT_FIELD_AT",
      payload: { field: newField, index: idx + 1 },
    });
    setTimeout(() => {
      fieldRefs.current.get(newField.id)?.focus();
    }, 0);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title */}
      <input
        ref={titleRef}
        className="text-3xl sm:text-4xl font-black w-full outline-none bg-transparent"
        value={state.title}
        placeholder="Untitled form"
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", payload: e.target.value })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setGhostIndex(0);
          }
        }}
      />

      {/* Fields with interleaved positional GhostInputArea */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={state.fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {(() => {
              const items: React.ReactNode[] = [];

              state.fields.forEach((field, index) => {
                if (ghostIndex === index) {
                  items.push(
                    <GhostInputArea
                      key="positional-ghost"
                      ref={ghostRef}
                      dispatch={dispatch}
                      insertIndex={ghostIndex}
                      onFieldCreated={handleFieldCreated}
                      onEscape={handleGhostEscape}
                    />
                  );
                }

                items.push(
                  <SortableField key={field.id} id={field.id}>
                    {({ dragHandleProps }) => (
                      <FieldRenderer
                        field={field}
                        dispatch={dispatch}
                        labelRef={setFieldRef(field.id)}
                        onEnter={handleEnter}
                        onBackspaceDelete={handleBackspaceDelete}
                        onDuplicate={() => handleDuplicate(field.id)}
                        dragHandleProps={dragHandleProps}
                      />
                    )}
                  </SortableField>
                );
              });

              if (ghostIndex !== null && ghostIndex === state.fields.length) {
                items.push(
                  <GhostInputArea
                    key="positional-ghost"
                    ref={ghostRef}
                    dispatch={dispatch}
                    insertIndex={ghostIndex}
                    onFieldCreated={handleFieldCreated}
                    onEscape={handleGhostEscape}
                  />
                );
              }

              return items;
            })()}
          </div>
        </SortableContext>
      </DndContext>



      {/* Disabled submit preview */}
      <div className="mt-8">
        <Button
          type="button"
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md opacity-80 cursor-not-allowed"
          disabled
        >
          Submit
        </Button>
      </div>

      {/* Autosave status */}
      <div className="text-xs text-gray-500 fixed bottom-4 right-4">
        {saveStatus === "saving" && "Saving..."}
        {saveStatus === "saved" && "Saved"}
      </div>
    </div>
  );
}


