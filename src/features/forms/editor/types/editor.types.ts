import { IField } from "@/src/types/form.types";

export type EditorState = {
  title: string;
  fields: IField[];
};

export type EditorAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "ADD_FIELD"; payload: IField }
  | {
      type: "UPDATE_FIELD";
      payload: {
        id: string;
        data: Partial<IField>;
      };
    }
  | {
      type: "DELETE_FIELD";
      payload: {
        id: string;
      };
    }
  | { type: "HYDRATE"; payload: EditorState };
