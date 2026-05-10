import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createForm } from "../api/form.api";

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForm,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};
