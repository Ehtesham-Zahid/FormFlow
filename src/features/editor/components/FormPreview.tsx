"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { IField } from "@/src/types/form.types";
import { Loader2 } from "lucide-react";
import { CreateSubmissionInput } from "@/src/types/submission.types";

type Props = {
  title: string;
  fields: IField[];
  onSubmit?: (data: CreateSubmissionInput) => void;
  isSubmitting?: boolean;
};

export default function FormPreview({ title, fields, onSubmit, isSubmitting }: Props) {
  const [data, setData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const answers = Object.entries(data).map(([fieldId, value]) => ({
        fieldId,
        value,
      }));
      onSubmit({ answers });
    }
  };

  const handleFieldChange = (id: string, value: string) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-full flex items-start justify-center py-20 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
        {/* Form title */}
        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">
          {title || "Untitled form"}
        </h1>

        {/* Fields */}
        <div className="flex flex-col gap-8">
          {fields.length === 0 ? (
            <p className="text-sm text-gray-400">No fields added yet.</p>
          ) : (
            fields.map((field) => (
              <PreviewField
                key={field.id}
                field={field}
                value={data[field.id] || ""}
                onChange={(val) => handleFieldChange(field.id, val)}
              />
            ))
          )}
        </div>

        {/* Submit */}
        {fields.length > 0 && (
          <div className="mt-12">
            <Button
              type="submit"
              disabled={isSubmitting || (fields.some(f => f.required && !data[f.id]))}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium
                         rounded-md hover:bg-gray-700 transition-colors active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

function PreviewField({
  field,
  value,
  onChange
}: {
  field: IField;
  value: string;
  onChange: (val: string) => void;
}) {
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
          <input
            type="text"
            placeholder="Your answer"
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )}
        {field.type === "email" && (
          <input
            type="email"
            placeholder="email@example.com"
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )}
        {field.type === "number" && (
          <input
            type="number"
            placeholder="0"
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )}
      </div>
    </div>
  );
}
