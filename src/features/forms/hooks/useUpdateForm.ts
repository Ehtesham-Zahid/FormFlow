import { useMutation } from "@tanstack/react-query";
import { updateForm } from "../api/form.api";

export const useUpdateForm = () => {
  return useMutation({
    mutationFn: ({ formId, updates }: { formId: string; updates: any }) =>
      updateForm(formId, updates),
  });
};
