import { IForm } from "@/src/types/form.types";
import { ISubmission } from "../types/submission.types";

type Props = {
  form: IForm;
  submissions: ISubmission[];
};

export const SubmissionsTable = ({ form, submissions }: Props) => {
  const fields = form.publishedFields && form.publishedFields.length > 0
    ? form.publishedFields
    : form.fields || [];

  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg bg-white shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap">Submitted at</th>
            {fields.map((field) => (
              <th key={field.id} className="px-4 py-3 whitespace-nowrap">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {submissions.map((sub) => (
            <tr key={sub._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(sub.createdAt).toLocaleString()}
              </td>
              {fields.map((field) => (
                <td key={field.id} className="px-4 py-3 text-gray-900 max-w-xs truncate">
                  {sub.data?.[field.id] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
