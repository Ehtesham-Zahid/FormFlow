import React from "react";
import { IField } from "@/src/types/form.types";
import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import NumberField from "./fields/NumberField";

type Props = {
  field: IField;
  dispatch: any;
  labelRef?: React.Ref<HTMLInputElement>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onDuplicate?: () => void;
};

export default function FieldRenderer({ field, dispatch, labelRef, onEnter, onBackspaceDelete, onDuplicate }: Props) {
  switch (field.type) {
    case "text":
      return <TextField ref={labelRef} field={field} dispatch={dispatch} onEnter={onEnter} onBackspaceDelete={onBackspaceDelete} onDuplicate={onDuplicate} />;

    case "email":
      return <EmailField ref={labelRef} field={field} dispatch={dispatch} onEnter={onEnter} onBackspaceDelete={onBackspaceDelete} onDuplicate={onDuplicate} />;

    case "number":
      return <NumberField ref={labelRef} field={field} dispatch={dispatch} onEnter={onEnter} onBackspaceDelete={onBackspaceDelete} onDuplicate={onDuplicate} />;

    default:
      return null;
  }
}
