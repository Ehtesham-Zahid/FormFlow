import { IField } from "@/src/types/form.types";
import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import NumberField from "./fields/NumberField";

type Props = {
  field: IField;
  dispatch: any;
};

export default function FieldRenderer({ field, dispatch }: Props) {
  switch (field.type) {
    case "text":
      return <TextField field={field} dispatch={dispatch} />;

    case "email":
      return <EmailField field={field} dispatch={dispatch} />;

    case "number":
      return <NumberField field={field} dispatch={dispatch} />;

    default:
      return null;
  }
}
