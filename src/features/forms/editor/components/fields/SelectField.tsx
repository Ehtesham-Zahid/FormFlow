"use client";

import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { X, Plus } from "lucide-react";

type Props = {
  ref?: React.Ref<HTMLInputElement>;
  field: IField;
  dispatch: React.Dispatch<any>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onDuplicate?: () => void;
  dragHandleProps?: any;
};

export default function SelectField({ ref, field, dispatch, onEnter, onBackspaceDelete, onDuplicate, dragHandleProps }: Props) {
  const options = field.options ?? ["Option 1"];

  const updateOptions = (newOptions: string[]) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { id: field.id, data: { options: newOptions } },
    });
  };

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
            }
          }}
        />
        {field.required && (
          <span className="text-red-400 text-sm leading-none select-none">*</span>
        )}
      </div>

      {/* Editable options */}
      <div className="mt-3 space-y-1.5">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={opt}
              onChange={(e) => {
                const next = [...options];
                next[i] = e.target.value;
                updateOptions(next);
              }}
              className="h-7 text-sm"
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 1 && (
              <button
                type="button"
                onClick={() => updateOptions(options.filter((_, j) => j !== i))}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                aria-label="Remove option"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700 gap-1"
          onClick={() => updateOptions([...options, ""])}
        >
          <Plus size={12} />
          Add option
        </Button>
      </div>

      {/* Select preview */}
      <div className="mt-3">
        <Select disabled>
          <SelectTrigger className="text-sm text-gray-400 cursor-default">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt, i) => (
              <SelectItem key={i} value={opt || `option-${i}`}>
                {opt || `Option ${i + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FieldShell>
  );
}
