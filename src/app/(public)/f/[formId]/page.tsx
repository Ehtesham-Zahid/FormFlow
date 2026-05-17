import { PublicFormRenderer } from "@/src/features/forms/submissions/components/PublicFormRenderer";

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  return <PublicFormRenderer formId={formId} />;
}
