"use client";

import { useCallback, useReducer, useState } from "react";
import { editorReducer } from "@/src/features/forms/editor/reducers/editor.reducer";
import { useUpdateForm } from "@/src/features/forms/hooks/useUpdateForm";
import { useAutosaveForm } from "../hooks/useAutosaveForm";
import { IForm } from "@/src/types/form.types";
import EditorHeader from "./EditorHeader";
import FormEditor from "./FormEditor";

import { useQueryClient } from "@tanstack/react-query";

type Props = {
  form: IForm;
  formId: string;
};

export default function EditorPageClient({ form, formId }: Props) {

  const initialState = {
    title: form.title ?? "",
    fields: form.fields ?? [],
  };

  const [state, dispatch] = useReducer(editorReducer, initialState);

  const { mutateAsync: updateForm } = useUpdateForm();
  const queryClient = useQueryClient();

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const onSaveStart = useCallback(() => setSaveStatus("saving"), []);
  const onSaveSuccess = useCallback(() => {
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 1500);
  }, []);

  const { flush } = useAutosaveForm(
    formId,
    state,
    initialState,
    onSaveStart,
    onSaveSuccess,
  );

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
