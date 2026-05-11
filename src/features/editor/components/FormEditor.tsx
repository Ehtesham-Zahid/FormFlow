"use client";

import { useEffect, useReducer } from "react";
import { editorReducer } from "../reducers/editor.reducer";
import { EditorState } from "../types/editor.types";
import BlockRenderer from "./BlockRenderer";
import {
  createDefaultTextBlock,
  createDefaultEmailBlock,
  createDefaultNumberBlock,
} from "../constants/defaultBlocks";

type Props = {
  form: {
    title: string;
    blocks: any[];
  };
};

const initialState: EditorState = {
  title: "",
  blocks: [],
};

export default function FormEditor({ form }: Props) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  // 🔥 Hydrate editor when form loads
  useEffect(() => {
    if (!form) return;

    dispatch({
      type: "HYDRATE",
      payload: {
        title: form.title ?? "Untitled Form",
        blocks: form.blocks ?? [],
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

      {/* Blocks */}
      <div className="space-y-3">
        {state.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} dispatch={dispatch} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_BLOCK",
              payload: createDefaultTextBlock(),
            })
          }
        >
          + Text
        </button>

        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_BLOCK",
              payload: createDefaultEmailBlock(),
            })
          }
        >
          + Email
        </button>

        <button
          className="px-3 py-2 border rounded"
          onClick={() =>
            dispatch({
              type: "ADD_BLOCK",
              payload: createDefaultNumberBlock(),
            })
          }
        >
          + Number
        </button>
      </div>
    </div>
  );
}
