"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Checkbox } from "@/src/components/ui/checkbox";
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
    <div className="min-h-full flex items-start justify-center py-10 sm:py-20 px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
        {/* Form title */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 sm:mb-10 tracking-tight">
          {title || "Untitled form"}
        </h1>

        {/* Fields */}
        <div className="flex flex-col gap-6 sm:gap-8">
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
          <div className="mt-10 sm:mt-12">
            <Button
              type="submit"
              disabled={isSubmitting || (fields.some(f => f.required && !data[f.id]))}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white text-sm font-medium
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

  const options = field.options ?? [];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[15px] font-medium text-gray-800">
        {field.label || "Untitled question"}
        {field.required && (
          <span className="text-red-400 ml-1 select-none">*</span>
        )}
      </label>

      {/* text / email / number — underline style */}
      {(field.type === "text" || field.type === "email" || field.type === "number") && (
        <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors">
          {field.type === "text" && (
            <input
              type="text"
              placeholder={field.placeholder || "Your answer"}
              className={inputClass}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            />
          )}
          {field.type === "email" && (
            <input
              type="email"
              placeholder={field.placeholder || "email@example.com"}
              className={inputClass}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            />
          )}
          {field.type === "number" && (
            <input
              type="number"
              placeholder={field.placeholder || "0"}
              className={inputClass}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            />
          )}
        </div>
      )}

      {/* textarea */}
      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder || "Your answer"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          rows={4}
          className="text-sm"
        />
      )}

      {/* select */}
      {field.type === "select" && (
        <Select
          value={value}
          onValueChange={(val) => onChange(val)}
          required={field.required}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select an option..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt, i) => (
              <SelectItem key={i} value={opt || `option-${i}`}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* radio */}
      {field.type === "radio" && (
        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val)}
          required={field.required}
          className="space-y-2"
        >
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <RadioGroupItem value={opt || `option-${i}`} id={`${field.id}-${i}`} />
              <label htmlFor={`${field.id}-${i}`} className="text-sm text-gray-700 cursor-pointer">
                {opt}
              </label>
            </div>
          ))}
        </RadioGroup>
      )}

      {/* checkbox */}
      {field.type === "checkbox" && (
        <div className="flex items-center gap-2">
          <Checkbox
            id={`${field.id}-check`}
            checked={value === "true"}
            onCheckedChange={(checked) => onChange(checked ? "true" : "false")}
            required={field.required}
          />
          <label htmlFor={`${field.id}-check`} className="text-sm text-gray-700 cursor-pointer">
            {field.label || "Check this box"}
          </label>
        </div>
      )}
    </div>
  );
}
