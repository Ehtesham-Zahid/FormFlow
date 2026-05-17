"use client";

import { useState } from "react";
import { EditorState } from "../types/editor.types";
import FieldRenderer from "./FieldRenderer";
import { useParams } from "next/navigation";
import {
  createDefaultTextField,
  createDefaultEmailField,
  createDefaultNumberField,
} from "../constants/defaultFields";
import { Button } from "@/src/components/ui/button";

type Props = {
  state: EditorState;
  dispatch: React.Dispatch<any>;
  saveStatus: "idle" | "saving" | "saved";
};

export default function FormEditor({ state, dispatch, saveStatus }: Props) {
  const { id: formId } = useParams<{ id: string }>();

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title */}
      <input
        className="text-3xl sm:text-4xl font-black w-full outline-none"
        value={state.title}
        placeholder="Untitled form"
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", payload: e.target.value })
        }
      />

      {/* Fields */}
      <div className="space-y-3">
        {state.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} dispatch={dispatch} />
        ))}
      </div>

      {/* Disabled submit preview */}
      <div className="mt-12">
        <Button
          type="button"
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md opacity-80 cursor-not-allowed"
          disabled
        >
          Submit
        </Button>
      </div>

      {/* Add field actions */}
      <div className="flex flex-wrap gap-2 pt-4">
        <Button
          variant="outline"
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultTextField() })
          }
        >
          + Text
        </Button>
        <Button
          variant="outline"
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultEmailField() })
          }
        >
          + Email
        </Button>
        <Button
          variant="outline"
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultNumberField() })
          }
        >
          + Number
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
