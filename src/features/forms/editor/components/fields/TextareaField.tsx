"use client";

import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";
import { Textarea } from "@/src/components/ui/textarea";

type Props = {
  ref?: React.Ref<HTMLInputElement>;
  field: IField;
  dispatch: React.Dispatch<any>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onArrowUp?: (fieldId: string) => void;
  onArrowDown?: (fieldId: string) => void;
  onDuplicate?: () => void;
  dragHandleProps?: any;
};

export default function TextareaField({
  ref,
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
              onArrowUp?.(field.id);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              onArrowDown?.(field.id);
            }
          }}
        />
        {field.required && (
          <span className="text-red-400 text-sm leading-none select-none">
            *
          </span>
        )}
      </div>

      {/* Textarea preview */}
      <div className="mt-2">
        <Textarea
          disabled
          placeholder="Long text answer..."
          className="resize-none text-sm text-gray-400 placeholder:text-gray-300 cursor-default bg-transparent"
          rows={3}
        />
      </div>
    </FieldShell>
  );
}
