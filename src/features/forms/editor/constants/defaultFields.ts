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

export const createDefaultTextareaField = (): IField => ({
  id: crypto.randomUUID(),
  type: "textarea",
  label: "Long Text",
  required: true,
});

export const createDefaultSelectField = (): IField => ({
  id: crypto.randomUUID(),
  type: "select",
  label: "Dropdown",
  required: true,
  options: ["Option 1"],
});

export const createDefaultRadioField = (): IField => ({
  id: crypto.randomUUID(),
  type: "radio",
  label: "Multiple Choice",
  required: true,
  options: ["Option 1"],
});

export const createDefaultCheckboxField = (): IField => ({
  id: crypto.randomUUID(),
  type: "checkbox",
  label: "Checkbox",
  required: false,
});

