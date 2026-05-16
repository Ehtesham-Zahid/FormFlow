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
  formId: string;
};

export default function EditorPageClient({ form, formId }: Props) {
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
    await updateForm({ formId: formId, updates: { status: "published" } });
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
        <FormEditor state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
