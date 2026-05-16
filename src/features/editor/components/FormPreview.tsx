"use client";

import { Button } from "@/src/components/ui/button";
import { IField } from "@/src/types/form.types";

type Props = {
  title: string;
  fields: IField[];
};

export default function FormPreview({ title, fields }: Props) {
  return (
    <div className="min-h-full flex items-start justify-center py-20 px-4">
      <div className="w-full max-w-[600px]">
        {/* Form title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 tracking-tight">
          {title || "Untitled form"}
        </h1>

        {/* Fields */}
        <div className="flex flex-col gap-8">
          {fields.length === 0 ? (
            <p className="text-sm text-gray-400">No fields added yet.</p>
          ) : (
            fields.map((field) => <PreviewField key={field.id} field={field} />)
          )}
        </div>

        {/* Submit */}
        {fields.length > 0 && (
          <div className="mt-12">
            <Button
              type="button"
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium
                         rounded-md hover:bg-gray-700 transition-colors active:scale-[0.98]"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewField({ field }: { field: IField }) {
  const inputClass =
    "w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-300 py-1";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] font-medium text-gray-800">
        {field.label || "Untitled question"}
        {field.required && (
          <span className="text-red-400 ml-1 select-none">*</span>
        )}
      </label>

      <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors">
        {field.type === "text" && (
          <input type="text" placeholder="Your answer" className={inputClass} />
        )}
        {field.type === "email" && (
          <input
            type="email"
            placeholder="email@example.com"
            className={inputClass}
          />
        )}
        {field.type === "number" && (
          <input type="number" placeholder="0" className={inputClass} />
        )}
      </div>
    </div>
  );
}
