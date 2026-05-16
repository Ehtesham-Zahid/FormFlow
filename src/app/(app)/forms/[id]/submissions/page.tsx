"use client";

import { useParams } from "next/navigation";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { Inbox } from "lucide-react";

// TODO: replace with real hook when submissions feature is built
// import { useSubmissions } from "@/src/features/submissions/hooks/useSubmissions";

export default function SubmissionsPage() {
  const { id: formId } = useParams<{ id: string }>();
  const { data: form } = useForm(formId);

  // Placeholder — wire up useSubmissions(formId) when ready
  const submissions: any[] = [];
  const isLoading = false;

  const isDraft = form?.status === "draft";

  if (isDraft) {
    return (
      <EmptyState
        icon={<Inbox size={28} className="text-gray-300" />}
        title="Form not published"
        description="Publish your form to start collecting submissions."
      />
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

  if (submissions.length === 0) {
    return (
      <EmptyState
        icon={<Inbox size={28} className="text-gray-300" />}
        title="No submissions yet"
        description="Share your form to start collecting responses."
      />
    );
  }

  // Table — renders when submissions exist
  const columns = form?.fields?.map((f: any) => f.label) ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Submissions</h1>
        <span className="text-sm text-gray-400">
          {submissions.length} response{submissions.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 w-[160px]">
                Submitted at
              </th>
              {columns.map((col: string) => (
                <th
                  key={col}
                  className="text-left px-4 py-2.5 text-xs font-medium text-gray-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub: any, i: number) => (
              <tr
                key={sub._id ?? i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
                {form?.fields?.map((field: any) => (
                  <td key={field.id} className="px-4 py-3 text-gray-700">
                    {sub.data?.[field.id] ?? (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3">
      {icon}
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}
