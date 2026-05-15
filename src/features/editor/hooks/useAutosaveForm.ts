import { useEffect } from "react";
import { debounce } from "lodash";
import { EditorState } from "../types/editor.types";
import { updateForm } from "@/src/features/forms/api/form.api";

export function useAutosaveForm(
  formId: string,
  state: EditorState,
  options?: {
    onSaveStart?: () => void;
    onSaveSuccess?: () => void;
  },
) {
  useEffect(() => {
    const save = debounce(async (data: EditorState) => {
      try {
        options?.onSaveStart?.();

        await updateForm(formId, {
          title: data.title,
          fields: data.fields,
        });

        options?.onSaveSuccess?.();
      } catch (err) {
        console.error("Autosave failed:", err);
      }
    }, 2000); // 2s delay

    save(state);

    return () => {
      save.cancel();
    };
  }, [state, formId]);
}
