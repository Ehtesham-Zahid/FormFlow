"use client";

import React from "react";
import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";
import { Input } from "@/src/components/ui/input";

type Props = {
  field: IField;
  dispatch: React.Dispatch<any>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onDuplicate?: () => void;
};

const EmailField = React.forwardRef<HTMLInputElement, Props>(
  ({ field, dispatch, onEnter, onBackspaceDelete, onDuplicate }, ref) => {
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
              }
            }}
          />
          {field.required && (
            <span className="text-red-400 text-sm leading-none select-none">
              *
            </span>
          )}
        </div>

        {/* Preview input */}
        <div className="mt-2">
          <Input
            type="email"
            disabled
            placeholder="email@example.com"
          />
        </div>
      </FieldShell>
    );
  },
);

EmailField.displayName = "EmailField";

export default EmailField;


