import { Block } from "../types/editor.types";

export const createDefaultTextBlock = (): Block => ({
  id: crypto.randomUUID(),
  type: "text",
  props: {
    label: "Text Field",
    placeholder: "Enter text...",
    required: false,
  },
});

export const createDefaultEmailBlock = (): Block => ({
  id: crypto.randomUUID(),
  type: "email",
  props: {
    label: "Email",
    placeholder: "Enter email...",
    required: false,
  },
});

export const createDefaultNumberBlock = (): Block => ({
  id: crypto.randomUUID(),
  type: "number",
  props: {
    label: "Number",
    placeholder: "Enter number...",
    required: false,
  },
});
