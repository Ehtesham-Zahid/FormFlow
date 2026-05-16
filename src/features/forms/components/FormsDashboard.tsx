"use client";

import { useForms } from "../hooks/useForms";
import { useDeleteForm } from "../hooks/useDeleteForm";
import { FormsHeader } from "./FormsHeader";
import { FormsList } from "./FormsList";
import { useCreateForm } from "../hooks/useCreateForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const FormsDashboard = () => {
  const { data: forms, isLoading } = useForms();
  const { mutate: createForm, isPending } = useCreateForm();
  const { mutateAsync: deleteFormAsync } = useDeleteForm();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await toast.promise(deleteFormAsync(id), {
      loading: "Deleting form...",
      success: "Form deleted successfully!",
      error: "Failed to delete form",
    });
  };

  const handleCreate = () => {
    createForm(undefined, {
      onSuccess: (data) => {
        router.push(`/forms/${data.id}/edit`);
      },
    });
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
