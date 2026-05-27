"use client";

import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";
import { Input } from "@/src/components/ui/input";

type Props = {
  ref?: React.Ref<HTMLInputElement>;
  placeholderRef?: React.Ref<HTMLInputElement>;
  field: IField;
  dispatch: React.Dispatch<any>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onArrowUp?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onArrowDown?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onDuplicate?: () => void;
  dragHandleProps?: any;
};

export default function TextField({
  ref,
  placeholderRef,
  field,
  dispatch,
  onEnter,
  onBackspaceDelete,
  onArrowUp,
  onArrowDown,
  onDuplicate,
  dragHandleProps,
}: Props) {
  return (
    <FieldShell
      required={field.required}
      onToggleRequired={() =>
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            id: field.id,
            data: { required: !field.required },
          },
        })
      }
      onDuplicate={onDuplicate}
      onDelete={() =>
        dispatch({
          type: "DELETE_FIELD",
          payload: { id: field.id },
        })
      }
      dragHandleProps={dragHandleProps}
    >

      {/* Label — Notion-style editable heading */}
      <div className="flex items-baseline gap-1">
        <input
          ref={ref}
          className="w-full text-[15px] font-medium text-gray-800 outline-none bg-transparent
                     placeholder:text-gray-300 leading-snug"
          value={field.label}
          placeholder="Question"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: {
                id: field.id,
                data: { label: e.target.value },
              },
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter?.(field.id);
            } else if (e.key === "Backspace" && field.label === "") {
              e.preventDefault();
              onBackspaceDelete?.(field.id);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              onArrowUp?.(field.id, "label");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              onArrowDown?.(field.id, "label");
            }
          }}
        />
        {field.required && (
          <span className="text-red-400 text-sm leading-none select-none">
            *
          </span>
        )}
      </div>

      {/* Answer input — editable placeholder block below */}
      <div className="mt-2.5">
        <input
          ref={placeholderRef}
          value={field.placeholder ?? ""}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: {
                id: field.id,
                data: { placeholder: e.target.value },
              },
            })
          }
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              onArrowUp?.(field.id, "placeholder");
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              onArrowDown?.(field.id, "placeholder");
            } else if (e.key === "Enter") {
              e.preventDefault();
              onEnter?.(field.id);
            }
          }}
          placeholder="Write placeholder text..."
          className="w-full text-sm text-gray-400 bg-transparent border border-dashed border-gray-200 hover:border-gray-300 focus:border-solid focus:border-gray-300 focus:text-gray-700 focus:placeholder:text-gray-300 focus:ring-0 rounded-md px-3 py-1.5 transition-all outline-none italic"
        />
      </div>
    </FieldShell>
  );
}
