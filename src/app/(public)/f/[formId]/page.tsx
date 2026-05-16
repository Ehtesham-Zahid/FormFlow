import { getFormById } from "@/src/services/form.service";
import { notFound } from "next/navigation";
import FormPreview from "@/src/features/editor/components/FormPreview";

export default async function PublicFormPage({
  params,
}: {
  params: { formId: string };
}) {
  try {
    const form = await getFormById(params.formId);

    // If it's published but has no publishedFields
    if (!form.publishedFields || form.publishedFields.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              This form is not available
            </h1>
            <p className="text-sm text-gray-500">
              The owner has not published any fields yet.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <FormPreview
          title={form.publishedTitle}
          fields={form.publishedFields}
        />
      </div>
    );
  } catch (error: any) {
    if (error.statusCode === 404 || error.statusCode === 403) {
      notFound();
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="text-sm text-gray-500">
            We couldn't load this form. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
