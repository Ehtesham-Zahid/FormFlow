import mongoose from "mongoose";
import { SubmissionDocument } from "../types/submission.types";

const AnswerSchema = new mongoose.Schema({
  fieldId: { type: String, required: true },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const SubmissionSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: [AnswerSchema],
  },
  { timestamps: true },
);

export const Submission =
  mongoose.models.Submission ||
  mongoose.model<SubmissionDocument>("Submission", SubmissionSchema);
