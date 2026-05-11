import { EditorAction, EditorState } from "../types/editor.types";

export const editorReducer = (
  state: EditorState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "ADD_BLOCK":
      return {
        ...state,
        blocks: [...state.blocks, action.payload],
      };

    case "UPDATE_BLOCK":
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === action.payload.id
            ? {
                ...block,
                props: {
                  ...block.props,
                  ...action.payload.props,
                },
              }
            : block,
        ),
      };
    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "HYDRATE":
      return action.payload;

    default:
      return state;
  }
};
