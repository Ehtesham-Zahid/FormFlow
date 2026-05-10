import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteForm } from "../api/form.api";

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formId: string) => deleteForm(formId),

    onSuccess: (_, formId) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },
  });
};
