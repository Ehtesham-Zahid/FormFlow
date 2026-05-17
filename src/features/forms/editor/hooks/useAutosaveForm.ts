import { useEffect, useRef, useMemo } from "react";
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
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const save = useMemo(() => {
    return debounce(async (data: EditorState) => {
      try {
        optionsRef.current?.onSaveStart?.();

        await updateForm(formId, {
          title: data.title,
          fields: data.fields,
        });

        optionsRef.current?.onSaveSuccess?.();
      } catch (err) {
        console.error("Autosave failed:", err);
      }
    }, 2000);
  }, [formId]);

  useEffect(() => {
    save(state);
  }, [state, save]);

  useEffect(() => {
    return () => save.cancel();
  }, [save]);

  return { cancel: save.cancel };
}
