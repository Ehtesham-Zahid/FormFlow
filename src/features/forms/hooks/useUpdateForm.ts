import { useMutation } from "@tanstack/react-query";
import { updateForm } from "../api/form.api";

export const useUpdateForm = () => {
  return useMutation({
    mutationFn: ({ formId, updates }: { formId: string; updates: any }) =>
      updateForm(formId, updates),
    // No onSuccess invalidation — the editor owns its own local state.
    // Triggering a refetch here creates a save → invalidate → refetch →
    // HYDRATE → state-change → save loop. Publish handles its own invalidation
    // explicitly in EditorPageClient.handlePublish.
  });
};
