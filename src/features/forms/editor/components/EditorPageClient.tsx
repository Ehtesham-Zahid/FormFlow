"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { editorReducer } from "@/src/features/forms/editor/reducers/editor.reducer";
import { EditorState } from "@/src/features/forms/editor/types/editor.types";
import { useUpdateForm } from "@/src/features/forms/hooks/useUpdateForm";
import { useAutosaveForm } from "../hooks/useAutosaveForm";
import { IForm } from "@/src/types/form.types";
import EditorHeader from "./EditorHeader";
import FormEditor from "./FormEditor";

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "../../hooks/useForm";

const initialState: EditorState = {
  title: "",
  fields: [],
};

type Props = {
  formId: string;
};

export default function EditorPageClient({ formId }: Props) {
  const { data: form, isLoading } = useForm(formId);

  const [state, dispatch] = useReducer(editorReducer, initialState);
  const { mutateAsync: updateForm } = useUpdateForm();
  const queryClient = useQueryClient();
  const isHydratedRef = useRef(false);

  // Hydrate editor when form loads
  useEffect(() => {
    if (!form) return;
    dispatch({
      type: "HYDRATE",
      payload: {
        title: form.title ?? "",
        fields: form.fields ?? [],
      },
    });
    isHydratedRef.current = true;
  }, [form]);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const initialServerState: EditorState = {
    title: form.title ?? "",
    fields: form.fields ?? [],
  };

  // Fix 3: memoize so the object reference is stable — prevents the optionsRef
  // useEffect from firing on every render due to a new inline object literal.
  const autosaveOptions = useMemo(() => ({
    onSaveStart: () => setSaveStatus("saving"),
    onSaveSuccess: () => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1500);
    },
  }), []);

  const { flush } = useAutosaveForm(formId, state, isHydratedRef, initialServerState, autosaveOptions);

  const handlePublish = async () => {
    await flush();

    // Then trigger the publish snapshot
    await updateForm({
      formId,
      updates: { status: "published" },
    });

    // Manually invalidate cache to sync published status
    queryClient.invalidateQueries({ queryKey: ["form", formId] });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!form) return <p>Form not found</p>;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 pb-0 md:p-6 md:pb-0">
        <EditorHeader
          title={state.title}
          status={form.status}
          fields={state.fields}
          formId={formId}
          onPublish={handlePublish}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <FormEditor state={state} dispatch={dispatch} saveStatus={saveStatus} />
      </div>
    </div>
  );
}
