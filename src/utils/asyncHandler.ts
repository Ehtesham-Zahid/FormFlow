import { handleError } from "../lib/errors/errorClassifier";

export const asyncHandler =
  (fn: Function) =>
  async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw handleError(error);
    }
  };
