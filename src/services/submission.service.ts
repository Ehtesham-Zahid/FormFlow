// CRUD
import { connectDB } from "../lib/db";
import { AppError } from "../lib/errors/appError";
import { handleError } from "../lib/errors/errorClassifier";
import { Form } from "../models/form.model";
import { Submission } from "../models/submission.model";
import { FieldDocument, IField } from "../types/form.types";
import {
  CreateSubmissionInput,
  SubmissionDocument,
} from "../types/submission.types";

export const createSubmission = async (
  formId: string,
  submissionData: CreateSubmissionInput,
): Promise<SubmissionDocument> => {
  await connectDB();

  try {
    const form = await Form.findById(formId);
    if (!form) {
      throw new AppError("Form doesnt exist", 404);
    }

    // 1. Build valid field lookup
    const validFieldIds = new Set(
      form.fields.map((f: FieldDocument) => f._id.toString()),
    );

    // 2. Validate fieldIds + normalize answers
    const cleanAnswers = submissionData.answers.map((ans) => {
      if (!validFieldIds.has(ans.fieldId)) {
        throw new AppError(
          `Invalid fieldId in submission: ${ans.fieldId}`,
          400,
        );
      }

      return {
        fieldId: ans.fieldId,
        value: ans.value,
      };
    });

    // 3. Validate required fields (if you support it in schema)
    const requiredFields = form.fields.filter((f: any) => f.required);

    for (const field of requiredFields) {
      const exists = cleanAnswers.some(
        (ans) => ans.fieldId === field._id.toString(),
      );

      if (!exists) {
        throw new AppError(`Missing required field: ${field.label}`, 400);
      }
    }

    // 4. Create submission (clean + trusted data only)
    const submission = await Submission.create({
      formId,
      answers: cleanAnswers,
    });

    return submission;
  } catch (error) {
    throw handleError(error);
  }
};
