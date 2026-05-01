import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import { CreateFormInput, FormDocument } from "../types/form.types";
import { AppError } from "../lib/errors/appError";
import { handleError } from "../lib/errors/errorClassifier";

export const createForm = async (
  data: CreateFormInput,
  userId: string,
): Promise<FormDocument> => {
  await connectDB();

  try {
    const form = await Form.create({
      ...data,
      userId,
    });

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserForms = async (userId: string): Promise<FormDocument[]> => {
  await connectDB();

  try {
    const userForms = await Form.find({ userId });

    return userForms;
  } catch (error) {
    throw handleError(error);
  }
};

export const getFormById = async (
  formId: string,
  userId?: string,
): Promise<FormDocument> => {
  await connectDB();

  try {
    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (userId && form.userId === userId) {
      return form;
    }

    // Otherwise only allow public forms
    if (!form.isPublic) {
      throw new AppError("Forbidden", 403);
    }

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteForm = async (
  formId: string,
  userId: string,
): Promise<FormDocument> => {
  await connectDB();

  try {
    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await form.deleteOne();

    return form;
  } catch (error) {
    throw handleError(error);
  }
};
