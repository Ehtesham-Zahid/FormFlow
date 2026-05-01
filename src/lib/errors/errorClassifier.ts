import { AppError } from "./appError";

export const handleError = (error: any): never => {
    if (!error || typeof error !== "object") {
        throw new AppError("Something went wrong", 500);
    }

    // Validation error
    if (error.name === "ValidationError") {
        throw new AppError("Invalid form data", 400);
    }

    // Cast error (bad ObjectId etc.)
    if (error.name === "CastError") {
        throw new AppError("Invalid ID format", 400);
    }

    // Duplicate key error
    if (error.code === 11000) {
        throw new AppError("Duplicate field value", 400);
    }

    // Default fallback
    throw new AppError("Internal Server Error", 500);
};