"use client";

import FormEditor from "@/src/features/editor/components/FormEditor";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { useParams } from "next/navigation";
import EditorHeader from "@/src/features/editor/components/EditorHeader";
import { useUpdateForm } from "@/src/features/forms/hooks/useUpdateForm";

export default function Page() {
  const params = useParams<{ id: string }>();

  const { id: formId } = params;

  const { data: form, isLoading } = useForm(formId);

  const { mutateAsync: updateForm } = useUpdateForm();

  const handlePublish = async () => {
    await updateForm({ formId, updates: { status: "published" } });
  };

  if (isLoading) return <p>Loading...</p>;

  if (!form) return <p>Form not found</p>;

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader
        title={state.title} // from your editor reducer state
        status={form.status} // from useForm(id) — the DB value on load
        fields={state.fields} // from your editor reducer state
        onPublish={handlePublish}
      />

      <div className="p-6">
        <FormEditor form={form} />
      </div>
    </div>
  );
}
