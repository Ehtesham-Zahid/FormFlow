import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import { handleError } from "../lib/errors/errorClassifier";

export const createForm = async (data: any, userId: string) => {
    await connectDB();

    try {
        const form = await Form.create({
            ...data,
            userId
        });

        return form;
    } catch (error: any) {
        handleError(error);
    }
}

