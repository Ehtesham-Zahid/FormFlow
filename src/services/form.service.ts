import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import { CreateFormInput, FormDocument } from "../types/form.types";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../lib/errors/appError";

export const createForm = asyncHandler(
  async (data: CreateFormInput, userId: string): Promise<FormDocument> => {
    await connectDB();

    const form = await Form.create({
      ...data,
      userId,
    });

    return form;
  },
);

export const getUserForms = asyncHandler(
  async (userId: string): Promise<FormDocument[]> => {
    await connectDB();

    const userForms = await Form.find({ userId });

    return userForms;
  },
);

export const getUserFormById = asyncHandler(
  async (formId: string, userId: string): Promise<FormDocument> => {
    await connectDB();

    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    return form;
  },
);

export const getPublicFormById = asyncHandler(
  async (formId: string): Promise<FormDocument> => {
    await connectDB();

    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (!form.isPublic) {
      throw new AppError("Forbidden", 403);
    }

    return form;
  },
);

export const deleteForm = asyncHandler(
  async (formId: string, userId: string): Promise<FormDocument> => {
    await connectDB();

    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    await form.deleteOne();

    return form;
  },
);
