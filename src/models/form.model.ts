import mongoose from "mongoose";
import { FormDocument } from "../types/form.types";

const FieldSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "email", "number"],
    required: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const FormSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fields: [FieldSchema],
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true },
);

export const Form =
  mongoose.models.Form || mongoose.model<FormDocument>("Form", FormSchema);
