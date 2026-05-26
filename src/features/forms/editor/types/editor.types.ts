import { IField } from "@/src/types/form.types";

export type EditorState = {
  title: string;
  fields: IField[];
};

export type EditorAction =
  | { type: "SET_TITLE"; payload: string }
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
  | { type: "HYDRATE"; payload: EditorState }
  | { type: "INSERT_FIELD_AT"; payload: { field: IField; index: number } }
  | { type: "REORDER_FIELDS"; payload: { fromIndex: number; toIndex: number } };
