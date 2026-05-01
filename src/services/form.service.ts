import { Form } from "../models/form.model";
import { connectDB } from "../lib/db";
import { AppError } from "../lib/appError";

export const createForm = async (data: any, userId: string) => {
    await connectDB();

    try {
        const form = await Form.create({
            ...data,
            userId
        });

        return form;
    } catch (error: any) {
        if (error.name === "ValidationError") {
            throw new AppError("Invalid Form Data", 400)
        }

        throw new AppError("Could not create form", 500)
    }
}

