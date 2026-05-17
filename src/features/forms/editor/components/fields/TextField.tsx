"use client";

import { IField } from "@/src/types/form.types";
import FieldShell from "../FieldShell";

type Props = {
  field: IField;
  dispatch: React.Dispatch<any>;
};

export default function TextField({ field, dispatch }: Props) {
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
      onDelete={() =>
        dispatch({
          type: "DELETE_FIELD",
          payload: { id: field.id },
        })
      }
    >
      {/* Label — Notion-style editable heading */}
      <div className="flex items-baseline gap-1">
        <input
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
        />
        {field.required && (
          <span className="text-red-400 text-sm leading-none select-none">
            *
          </span>
        )}
      </div>

      {/* Answer input — visually separate block below */}
      <div className="mt-2 border-b border-gray-200 hover:border-gray-400 transition-colors">
        <input
          type="text"
          disabled
          placeholder="Short answer text"
          className="w-full py-1 text-sm text-gray-400 bg-transparent outline-none
                     placeholder:text-gray-300 cursor-default"
        />
      </div>
    </FieldShell>
  );
}
