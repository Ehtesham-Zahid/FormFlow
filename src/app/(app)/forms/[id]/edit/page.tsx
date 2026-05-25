import EditorPageClient from "@/src/features/forms/editor/components/EditorPageClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: formId } = await params;

  return <EditorPageClient formId={formId} />;
}
