import EditorPageClientLoading from "@/src/features/forms/editor/components/EditorPageClientLoading";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: formId } = await params;

  return <EditorPageClientLoading formId={formId} />;
}