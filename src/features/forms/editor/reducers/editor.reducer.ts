import { EditorAction, EditorState } from "../types/editor.types";

export const editorReducer = (
  state: EditorState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "ADD_FIELD":
      return {
        ...state,
        fields: [...state.fields, action.payload],
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        fields: state.fields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload.data }
            : field,
        ),
      };

    case "DELETE_FIELD":
      return {
        ...state,
        fields: state.fields.filter((field) => field.id !== action.payload.id),
      };

    case "HYDRATE":
      return action.payload;

    case "INSERT_FIELD_AT": {
      const newFields = [...state.fields];
      newFields.splice(action.payload.index, 0, action.payload.field);
      return {
        ...state,
        fields: newFields,
      };
    }

    default:
      return state;
  }
};

