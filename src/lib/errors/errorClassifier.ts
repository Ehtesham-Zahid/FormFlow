import { AppError } from "./appError";

export const handleError = (error: any): AppError => {
    if (!error || typeof error !== "object") {
        return new AppError("Something went wrong", 500);
    }

    // Validation error
    if (error.name === "ValidationError") {
        return new AppError("Invalid form data", 400);
    }

    // Cast error (bad ObjectId etc.)
    if (error.name === "CastError") {
        return new AppError("Invalid ID format", 400);
    }

    // Duplicate key error
    if (error.code === 11000) {
        return new AppError("Duplicate field value", 400);
    }

    // Default fallback
    return new AppError("Internal Server Error", 500);
};