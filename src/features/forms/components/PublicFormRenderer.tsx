"use client";

import { useForm } from "../hooks/useForm";
import FormPreview from "@/src/features/editor/components/FormPreview";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  formId: string;
};

export const PublicFormRenderer = ({ formId }: Props) => {
  const { data: form, isLoading, error } = useForm(formId);

  console.log(form);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    const status = (error as any)?.response?.status;
    if (status === 404 || status === 403) {
      notFound();
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500">
            We couldn't load this form. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!form || !form.publishedFields || form.publishedFields.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            This form is not available
          </h1>
          <p className="text-sm text-gray-500">
            The owner has not published any fields yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FormPreview
        title={form.publishedTitle || form.title}
        fields={form.publishedFields}
      />
    </div>
  );
};
