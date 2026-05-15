"use client";

import { useEffect, useReducer, useState } from "react";
import { editorReducer } from "../reducers/editor.reducer";
import { EditorState } from "../types/editor.types";
import FieldRenderer from "./FieldRenderer";

import {
  createDefaultTextField,
  createDefaultEmailField,
  createDefaultNumberField,
} from "../constants/defaultFields";

import { useAutosaveForm } from "../hooks/useAutosaveForm";
import { useParams } from "next/navigation";

type Props = {
  form: {
    title: string;
    fields: any[];
  };
};

const initialState: EditorState = {
  title: "",
  fields: [],
};

export default function FormEditor({ form }: Props) {
  const params = useParams<{ id: string }>();

  const { id: formId } = params;

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const [state, dispatch] = useReducer(editorReducer, initialState);

  useAutosaveForm(formId, state, {
    onSaveStart: () => setSaveStatus("saving"),
    onSaveSuccess: () => {
      setSaveStatus("saved");

      setTimeout(() => {
        setSaveStatus("idle");
      }, 1500);
    },
  });

  // Hydrate editor when form loads
  useEffect(() => {
    if (!form) return;

    dispatch({
      type: "HYDRATE",
      payload: {
        title: form.title ?? "Untitled Form2.0",
        fields: form.fields ?? [],
      },
    });
  }, [form]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Title */}
      <input
        className="text-2xl font-bold w-full outline-none"
        value={state.title}
        onChange={(e) =>
          dispatch({
            type: "SET_TITLE",
            payload: e.target.value,
          })
        }
      />

      {/* Fields */}
      <div className="space-y-3">
        {state.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} dispatch={dispatch} />
        ))}
      </div>

      <div className="pt-4">
        <button
          type="button"
          className="w-full bg-black text-white py-2 rounded-md opacity-80 cursor-not-allowed"
          disabled
        >
          Submit
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_FIELD",
              payload: createDefaultTextField(),
            })
          }
        >
          + Text
        </button>

        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_FIELD",
              payload: createDefaultEmailField(),
            })
          }
        >
          + Email
        </button>

        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_FIELD",
              payload: createDefaultNumberField(),
            })
          }
        >
          + Number
        </button>
      </div>

      <div className="text-xs text-gray-500 fixed bottom-4 right-4">
        {saveStatus === "saving" && "Saving..."}
        {saveStatus === "saved" && "Saved"}
      </div>
    </div>
  );
}
