"use client";

import FormEditor from "@/src/features/editor/components/FormEditor";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { id: formId } = params;

  const { data: form, isLoading } = useForm(formId);

  if (isLoading) return <p>Loading...</p>;

  if (!form) return <p>Form not found</p>;

  return (
    <div className="p-6">
      <FormEditor form={form} />
    </div>
  );
}
