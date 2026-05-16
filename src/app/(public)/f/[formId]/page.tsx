import { PublicFormRenderer } from "@/src/features/forms/components/PublicFormRenderer";

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  return <PublicFormRenderer formId={formId} />;
}
