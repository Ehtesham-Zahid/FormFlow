import { api } from "@/src/lib/axios";
import { ISubmission } from "../types/submission.types";

export const getSubmissions = async (formId: string): Promise<ISubmission[]> => {
  const response = await api.get(`/forms/${formId}/submissions`);
  return response.data.data;
};

export const createSubmission = async (formId: string, data: Record<string, string>): Promise<ISubmission> => {
  const response = await api.post(`/forms/${formId}/submissions`, { data });
  return response.data.data;
};
