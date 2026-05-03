import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import {
  FormDocument,
  FormResponse,
  FormSummary,
  UpdateFormInput,
} from "../types/form.types";
import { AppError } from "../lib/errors/appError";
import { handleError } from "../lib/errors/errorClassifier";
import Error from "next/error";

export const createForm = async (userId: string): Promise<FormDocument> => {
  await connectDB();
  try {
    const form = await Form.create({
      userId,
      title: "Untitled Form",
      fields: [],
    });

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserForms = async (userId: string): Promise<FormSummary[]> => {
  await connectDB();

  try {
    const forms = await Form.find({ userId })
      .select("title status createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    return forms;
  } catch (error) {
    throw handleError(error);
  }
};

export const getFormById = async (
  formId: string,
  userId?: string,
): Promise<FormResponse> => {
  await connectDB();

  try {
    const form = await Form.findById(formId).lean();
    if (!form) {
      throw new AppError("Form not found", 404);
    }

    const isOwner = userId && form.userId === userId;

    if (form.status === "draft" && !isOwner) {
      throw new AppError("Forbidden", 403);
    }

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateFormById = async (
  formId: string,
  userId: string,
  updates: UpdateFormInput,
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

    // Whitelist updates
    if (updates.title !== undefined) {
      form.title = updates.title;
    }

    if (updates.fields !== undefined) {
      form.fields = updates.fields;
    }

    if (updates.isPublic !== undefined) {
      form.isPublic = updates.isPublic;
    }

    await form.save();

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteFormById = async (
  formId: string,
  userId: string,
): Promise<{ id: string }> => {
  await connectDB();

  try {
    const form = await Form.findOneAndDelete({
      _id: formId,
      userId,
    });

    if (!form) {
      throw new AppError("Form not found or forbidden", 404);
    }

    return { id: formId };
  } catch (error) {
    throw handleError(error);
  }
};
