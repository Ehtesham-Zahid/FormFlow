import { api } from "@/src/lib/axios";
import { CreateSubmissionInput } from "@/src/types/submission.types";

export const createSubmission = async (formId: string, submissionData: CreateSubmissionInput) => {
    const response = await api.post(`/forms/${formId}/submissions`, submissionData);
    return response.data.data;
}

export const getSubmissions = async (formId: string) => {
    const response = await api.get(`/forms/${formId}/submissions`);
    return response.data.data;
}