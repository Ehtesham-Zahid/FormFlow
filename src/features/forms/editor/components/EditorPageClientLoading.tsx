"use client";
import { useForm } from "../../hooks/useForm";
import EditorPageClient from "./EditorPageClient";

export default function EditorPageClientLoading({ formId }: { formId: string }) {
    const { data: form, isLoading } = useForm(formId);

    if (isLoading) return <div>Loading...</div>;
    if (!form) return <p>Form not found</p>;

    return <EditorPageClient form={form} formId={formId} />;
}