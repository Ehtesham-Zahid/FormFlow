import { useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import { EditorState } from "../types/editor.types";
import { useUpdateForm } from "../../hooks/useUpdateForm";

export function useAutosaveForm(
  formId: string,
  state: EditorState,
  options?: {
    onSaveStart?: () => void;
    onSaveSuccess?: () => void;
  },
) {
  const optionsRef = useRef(options);
  const lastSavedRef = useRef<EditorState | null>(null);
  const { mutateAsync: updateFormMutation } = useUpdateForm();

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const save = useMemo(() => {
    return debounce(async (data: EditorState) => {
      if (JSON.stringify(lastSavedRef.current) === JSON.stringify(data)) {
        return;
      }

      try {
        optionsRef.current?.onSaveStart?.();

        await updateFormMutation({
          formId,
          updates: {
            title: data.title,
            fields: data.fields,
          },
        });

        lastSavedRef.current = data;
        optionsRef.current?.onSaveSuccess?.();
      } catch (err) {
        console.error("Autosave failed:", err);
      }
    }, 2000);
  }, [formId, updateFormMutation]);

  useEffect(() => {
    save(state);
  }, [state, save]);

  useEffect(() => {
    return () => save.cancel();
  }, [save]);

  return { cancel: save.cancel };
}
