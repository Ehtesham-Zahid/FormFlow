import { useMutation } from "@tanstack/react-query";
import { createSubmission } from "../api/submission.api";
import { CreateSubmissionInput } from "@/src/types/submission.types";

export const useCreateSubmission = () => {
    return useMutation({
        mutationFn: ({ formId, submissionData }: { formId: string; submissionData: CreateSubmissionInput }) =>
            createSubmission(formId, submissionData),
    });
}