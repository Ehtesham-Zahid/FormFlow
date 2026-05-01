import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import { handleError } from "../lib/errors/errorClassifier";
import { CreateFormInput, FormDocument } from "../types/form.types";

export const createForm = async (data: CreateFormInput, userId: string): Promise<FormDocument> => {
    await connectDB();

    try {
        const form = await Form.create({
            ...data,
            userId
        });

        return form;
    } catch (error) {
        throw handleError(error);
    }
}

