"use client";

import { useEffect, useReducer } from "react";
import { editorReducer } from "@/src/features/editor/reducers/editor.reducer";
import { EditorState } from "@/src/features/editor/types/editor.types";
import { useUpdateForm } from "@/src/features/forms/hooks/useUpdateForm";
import { IForm } from "@/src/types/form.types";
import EditorHeader from "./EditorHeader";
import FormEditor from "./FormEditor";

const initialState: EditorState = {
  title: "",
  fields: [],
};

type Props = {
  form: IForm;
};

export default function EditorPageClient({ form }: Props) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const { mutateAsync: updateForm } = useUpdateForm();

  // Hydrate editor when form loads
  useEffect(() => {
    dispatch({
      type: "HYDRATE",
      payload: {
        title: form.title ?? "",
        fields: form.fields ?? [],
      },
    });
  }, [form]);

  const handlePublish = async () => {
    await updateForm({ formId: form.id, updates: { status: "published" } });
  };

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader
        title={state.title}
        status={form.status}
        fields={state.fields}
        onPublish={handlePublish}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <FormEditor state={state} form={form} dispatch={dispatch} />
      </div>
    </div>
  );
}
