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
import { randomUUID } from "crypto";

export const createForm = async (userId: string): Promise<FormDocument> => {
  await connectDB();
  try {
    const form = await Form.create({
      userId
    });

    return form;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserForms = async (userId: string): Promise<FormSummary[]> => {
  await connectDB();

  try {
    const forms = await Form.find({
      userId,
      isArchived: false,
    })
      .select("title status createdAt updatedAt publishedTitle publishedFields publishedAt")
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
    const form = await Form.findOne({
      _id: formId,
      isArchived: false,
    }).lean();

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

    if (form.isArchived) {
      throw new AppError("Form is archived", 400);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    // Whitelist updates
    if (updates.title !== undefined) {
      if (typeof updates.title !== "string" || updates.title.trim() === "") {
        throw new AppError("Title cannot be empty", 400);
      }

      form.title = updates.title.trim();
    }

    if (updates.fields !== undefined) {
      if (!Array.isArray(updates.fields)) {
        throw new AppError("Fields must be an array", 400);
      }

      updates.fields.forEach((field, index) => {
        if (!field.type || !["text", "email", "number"].includes(field.type)) {
          throw new AppError(`Invalid field type at index ${index}`, 400);
        }

        if (!field.label || field.label.trim() === "") {
          throw new AppError(
            `Field label cannot be empty at index ${index}`,
            400,
          );
        }

        if (typeof field.required !== "boolean") {
          throw new AppError(
            `Field 'required' must be boolean at index ${index}`,
            400,
          );
        }
      });

      form.fields = updates.fields.map((field) => ({
        id: field.id ?? randomUUID(),
        type: field.type,
        label: field.label.trim(),
        required: field.required ?? false,
      }));
    }

    if (updates.status !== undefined) {
      if (!["draft", "published"].includes(updates.status)) {
        throw new AppError("Invalid status", 400);
      }

      if (updates.status === "published") {
        if (!form.fields || form.fields.length === 0) {
          throw new AppError(
            "Form must have at least one field to publish",
            400,
          );
        }
        form.publishedTitle = form.title;
        form.publishedFields = [...form.fields];
        form.publishedAt = new Date();
      }

      form.status = updates.status;
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
    const form = await Form.findById(formId);

    if (!form) {
      throw new AppError("Form not found", 404);
    }

    if (form.userId !== userId) {
      throw new AppError("Forbidden", 403);
    }

    if (form.isArchived) {
      throw new AppError("Form already archived", 400);
    }

    form.isArchived = true;

    await form.save();

    return { id: formId };
  } catch (error) {
    throw handleError(error);
  }
};
