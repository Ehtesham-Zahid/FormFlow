import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateForm } from "../api/form.api";

export const useUpdateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formId, updates }: { formId: string; updates: any }) =>
      updateForm(formId, updates),

    onSuccess: (_, variables) => {
      const { formId } = variables;

      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["form", formId],
      });
    },
  });
};
