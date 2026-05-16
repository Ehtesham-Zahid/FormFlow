"use client";

import { useParams } from "next/navigation";
import { useForm } from "@/src/features/forms/hooks/useForm";
import EditorPageClient from "@/src/features/editor/components/EditorPageClient";

export default function Page() {
  const { id: formId } = useParams<{ id: string }>();
  const { data: form, isLoading } = useForm(formId);

  if (isLoading) return <p>Loading...</p>;
  if (!form) return <p>Form not found</p>;

  return <EditorPageClient form={form} formId={formId} />;
}
