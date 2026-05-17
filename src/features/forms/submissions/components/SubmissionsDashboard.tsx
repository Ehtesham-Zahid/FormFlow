"use client";

import { useForm } from "@/src/features/forms/hooks/useForm";
import { Inbox } from "lucide-react";
import { useSubmissions } from "../hooks/useSubmissions";
import { SubmissionsEmptyState } from "./SubmissionsEmptyState";
import { SubmissionsTable } from "./SubmissionsTable";

type Props = {
  formId: string;
};

export const SubmissionsDashboard = ({ formId }: Props) => {
  const { data: form, isLoading: isFormLoading } = useForm(formId);
  const { data: submissions, isLoading: isSubmissionsLoading } = useSubmissions(formId);

  const isLoading = isFormLoading || isSubmissionsLoading;
  const isDraft = form?.status === "draft";

  if (isDraft) {
    return (
      <div className="h-full">
        <SubmissionsEmptyState
          icon={<Inbox size={28} />}
          title="Form not published"
          description="Publish your form to start collecting submissions."
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-100 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="h-full">
        <SubmissionsEmptyState
          icon={<Inbox size={28} />}
          title="No submissions yet"
          description="Share your form to start collecting responses."
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Submissions</h1>
        <span className="text-sm text-gray-400">
          {submissions.length} response{submissions.length !== 1 ? "s" : ""}
        </span>
      </div>

      <SubmissionsTable form={form!} submissions={submissions} />
    </div>
  );
};
