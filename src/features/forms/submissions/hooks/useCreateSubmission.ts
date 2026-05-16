import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubmission } from "../api/submission.api";

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formId, data }: { formId: string; data: Record<string, string> }) =>
      createSubmission(formId, data),
    onSuccess: (_, { formId }) => {
      queryClient.invalidateQueries({ queryKey: ["submissions", formId] });
    },
  });
};
