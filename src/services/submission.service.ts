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
    const validFieldIds = new Set(form.fields.map((f: FieldDocument) => f.id));

    // 2. Prevent duplicate fieldIds in submission
    const fieldIdSet = new Set<string>();

    submissionData.answers.forEach((ans) => {
      if (fieldIdSet.has(ans.fieldId)) {
        throw new AppError(
          `Duplicate fieldId in submission: ${ans.fieldId}`,
          400,
        );
      }
      fieldIdSet.add(ans.fieldId);
    });

    // 3. Validate fieldIds + normalize answers
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

    // 4. Validate required fields
    const requiredFields = form.fields.filter((f: FieldDocument) => f.required);

    for (const field of requiredFields) {
      const exists = cleanAnswers.some(
        (ans) => ans.fieldId === field.id.toString(),
      );

      if (!exists) {
        throw new AppError(`Missing required field: ${field.label}`, 400);
      }
    }

    // 5. Create submission
    const submission = await Submission.create({
      formId,
      answers: cleanAnswers,
    });

    return submission;
  } catch (error) {
    throw handleError(error);
  }
};

export const getSubmissionsByFormId = async (
  formId: string,
  userId: string,
) => {
  await connectDB();

  try {
    const form = await Form.findById(formId);
    if (!form) {
      throw new AppError("Form doesnt exist", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    const submissions = await Submission.find({ formId }).lean();

    return submissions;
  } catch (error) {
    throw handleError(error);
  }
};

export const getSubmissionById = async (
  formId: string,
  userId: string,
  submissionId: string,
) => {
  await connectDB();

  try {
    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form doesnt exist", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    const submission = await Submission.findOne({
      _id: submissionId,
      formId,
    }).lean();

    if (!submission) {
      throw new AppError("Submission not found", 404);
    }

    return submission;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteSubmissionById = async (
  formId: string,
  userId: string,
  submissionId: string,
) => {
  await connectDB();

  try {
    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form doesnt exist", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    const deletedSubmission = await Submission.findOneAndDelete({
      _id: submissionId,
      formId,
    });

    if (!deletedSubmission) {
      throw new AppError("Submission not found", 404);
    }

    return {
      id: submissionId,
    };
  } catch (error) {
    throw handleError(error);
  }
};
