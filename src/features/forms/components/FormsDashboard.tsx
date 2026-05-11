"use client";

import { useForms } from "../hooks/useForms";
import { useDeleteForm } from "../hooks/useDeleteForm";
import { FormsHeader } from "./FormsHeader";
import { FormsList } from "./FormsList";
import { useCreateForm } from "../hooks/useCreateForm";

export const FormsDashboard = () => {
  const { data: forms, isLoading } = useForms();
  const { mutate: createForm, isPending } = useCreateForm();
  const { mutate: deleteForm } = useDeleteForm();

  const handleDelete = (id: string) => {
    deleteForm(id);
  };

  const handleCreate = () => {
    console.log("Create form clicked");
    // later: open dialog or call mutation
    createForm();
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Loading forms...</p>;
  }

  return (
    <div className="space-y-6">
      <FormsHeader onCreate={handleCreate} isLoading={isPending} />

      <FormsList forms={forms || []} onDelete={handleDelete} />
    </div>
  );
};
