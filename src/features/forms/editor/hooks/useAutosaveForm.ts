import { useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import { EditorState } from "../types/editor.types";
import { useUpdateForm } from "../../hooks/useUpdateForm";

export function useAutosaveForm(
  formId: string,
  state: EditorState,
  initialServerState: EditorState,
  options?: {
    onSaveStart?: () => void;
    onSaveSuccess?: () => void;
  },
) {
  const optionsRef = useRef(options);
  // Initialize with server state so the first dirty-check compares against
  // real data, not null — preventing a spurious save on initial hydration.
  const lastSavedRef = useRef<EditorState>(initialServerState);

  // Fix 1: Put mutateAsync in a ref so it never appears in useMemo deps.
  // useMutation returns a new mutateAsync reference every render (TanStack
  // behavior), which would destroy and recreate the debounce on every render,
  // resetting the 2s timer and firing saves immediately.
  const { mutateAsync } = useUpdateForm();
  const mutateRef = useRef(mutateAsync);
  useEffect(() => {
    mutateRef.current = mutateAsync;
  }, [mutateAsync]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // save is now truly stable — only recreated if formId changes.
  const save = useMemo(() => {
    return debounce(async (data: EditorState) => {
      // Guard: skip if HYDRATE hasn't fired yet (prevents mount-time spurious save)
      // if (!isHydratedRef.current) return;

      if (JSON.stringify(lastSavedRef.current) === JSON.stringify(data)) {
        return;
      }

      try {
        optionsRef.current?.onSaveStart?.();

        await mutateRef.current({
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
  }, [formId
    // ,isHydratedRef
  ]); // mutateRef is stable — not needed in deps

  useEffect(() => {
    save(state);
  }, [state, save]);

  // ✅ flush on unmount — saves any pending changes before leaving
  useEffect(() => {
    return () => {
      save.flush?.();
    };
  }, [save]);

  return { flush: save.flush };
}
