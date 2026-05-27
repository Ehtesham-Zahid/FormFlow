"use client";

import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";
import { Checkbox } from "@/src/components/ui/checkbox";

type Props = {
  ref?: React.Ref<HTMLInputElement>;
  field: IField;
  dispatch: React.Dispatch<any>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onArrowUp?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onArrowDown?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onDuplicate?: () => void;
  dragHandleProps?: any;
};

export default function CheckboxField({
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

      {/* Label */}
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
              payload: { id: field.id, data: { label: e.target.value } },
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
          <span className="text-red-400 text-sm leading-none select-none">*</span>
        )}
      </div>
    </FieldShell>
  );
}
