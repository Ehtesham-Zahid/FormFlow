import { SubmissionsDashboard } from "@/src/features/forms/submissions/components/SubmissionsDashboard";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SubmissionsDashboard formId={id} />;
}
