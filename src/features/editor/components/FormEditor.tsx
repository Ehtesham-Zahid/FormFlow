"use client";

import { useState } from "react";
import { EditorState } from "../types/editor.types";
import FieldRenderer from "./FieldRenderer";
import { useAutosaveForm } from "../hooks/useAutosaveForm";
import { useParams } from "next/navigation";
import {
  createDefaultTextField,
  createDefaultEmailField,
  createDefaultNumberField,
} from "../constants/defaultFields";

type Props = {
  state: EditorState;
  form: { title: string; fields: any[] };
  dispatch: React.Dispatch<any>;
};

export default function FormEditor({ state, form, dispatch }: Props) {
  const { id: formId } = useParams<{ id: string }>();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useAutosaveForm(formId, state, {
    onSaveStart: () => setSaveStatus("saving"),
    onSaveSuccess: () => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1500);
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Title */}
      <input
        className="text-2xl font-bold w-full outline-none"
        value={state.title}
        placeholder="Untitled form"
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", payload: e.target.value })
        }
      />

      {/* Fields */}
      <div className="space-y-3">
        {state.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} dispatch={dispatch} />
        ))}
      </div>

      {/* Disabled submit preview */}
      <div className="pt-4">
        <button
          type="button"
          className="w-full bg-black text-white py-2 rounded-md opacity-80 cursor-not-allowed"
          disabled
        >
          Submit
        </button>
      </div>

      {/* Add field actions */}
      <div className="flex gap-2 pt-4">
        <button
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultTextField() })
          }
        >
          + Text
        </button>
        <button
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultEmailField() })
          }
        >
          + Email
        </button>
        <button
          className="px-3 py-2 border rounded text-sm"
          onClick={() =>
            dispatch({ type: "ADD_FIELD", payload: createDefaultNumberField() })
          }
        >
          + Number
        </button>
      </div>

      {/* Autosave status */}
      <div className="text-xs text-gray-500 fixed bottom-4 right-4">
        {saveStatus === "saving" && "Saving..."}
        {saveStatus === "saved" && "Saved"}
      </div>
    </div>
  );
}
