import { IField } from "@/src/types/form.types";

export const createDefaultTextField = (): IField => ({
  id: crypto.randomUUID(),
  type: "text",
  label: "Text Field",
  required: true,
});

export const createDefaultEmailField = (): IField => ({
  id: crypto.randomUUID(),
  type: "email",
  label: "Email",
  required: true,
});

export const createDefaultNumberField = (): IField => ({
  id: crypto.randomUUID(),
  type: "number",
  label: "Number",
  required: true,
});
