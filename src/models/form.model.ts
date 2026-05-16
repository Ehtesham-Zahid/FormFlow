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
      default: "Untitled Form"
    },
    publishedTitle: {
      type: String,
      default: "Untitled Form"
    },
    fields: {
      type: [FieldSchema],
      default: []
    },
    publishedFields: {
      type: [FieldSchema],
      default: []
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Form =
  mongoose.models.Form || mongoose.model<FormDocument>("Form", FormSchema);
