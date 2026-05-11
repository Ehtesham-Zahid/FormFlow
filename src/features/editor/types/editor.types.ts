export type BlockType = "text" | "email" | "number";

export type Block = {
  id: string;
  type: BlockType;
  props: {
    label: string;
    placeholder?: string;
    required?: boolean;
  };
};

export type EditorState = {
  title: string;
  blocks: Block[];
};

export type EditorAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "ADD_BLOCK"; payload: Block }
  | { type: "HYDRATE"; payload: EditorState }
  | {
      type: "UPDATE_BLOCK";
      payload: {
        id: string;
        props: Partial<Block["props"]>;
      };
    };
