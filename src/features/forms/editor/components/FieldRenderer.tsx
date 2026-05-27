import React from "react";
import { IField } from "@/src/types/form.types";
import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import NumberField from "./fields/NumberField";
import TextareaField from "./fields/TextareaField";
import SelectField from "./fields/SelectField";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";

type Props = {
  field: IField;
  dispatch: any;
  labelRef?: React.Ref<HTMLInputElement>;
  placeholderRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  onEnter?: (fieldId: string) => void;
  onBackspaceDelete?: (fieldId: string) => void;
  onArrowUp?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onArrowDown?: (fieldId: string, inputType: "label" | "placeholder") => void;
  onDuplicate?: () => void;
  dragHandleProps?: any;
};

export default function FieldRenderer({
  field,
  dispatch,
  labelRef,
  placeholderRef,
  onEnter,
  onBackspaceDelete,
  onArrowUp,
  onArrowDown,
  onDuplicate,
  dragHandleProps,
}: Props) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          ref={labelRef}
          placeholderRef={placeholderRef as React.Ref<HTMLInputElement>}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "email":
      return (
        <EmailField
          ref={labelRef}
          placeholderRef={placeholderRef as React.Ref<HTMLInputElement>}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "number":
      return (
        <NumberField
          ref={labelRef}
          placeholderRef={placeholderRef as React.Ref<HTMLInputElement>}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "textarea":
      return (
        <TextareaField
          ref={labelRef}
          placeholderRef={placeholderRef as React.Ref<HTMLTextAreaElement>}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "select":
      return (
        <SelectField
          ref={labelRef}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "radio":
      return (
        <RadioField
          ref={labelRef}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    case "checkbox":
      return (
        <CheckboxField
          ref={labelRef}
          field={field}
          dispatch={dispatch}
          onEnter={onEnter}
          onBackspaceDelete={onBackspaceDelete}
          onArrowUp={onArrowUp}
          onArrowDown={onArrowDown}
          onDuplicate={onDuplicate}
          dragHandleProps={dragHandleProps}
        />
      );

    default:
      return null;
  }
}

