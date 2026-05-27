import { useState, useEffect } from "react";
import { IForm } from "@/src/types/form.types";
import { ISubmission } from "@/src/types/submission.types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/src/components/ui/table";

type Props = {
  form: IForm;
  submissions: (ISubmission & { _id: string })[];
};

type CellProps = {
  value: string;
  isExpanded: boolean;
  onDoubleClick: () => void;
};

function SubmissionCell({ value, isExpanded, onDoubleClick }: CellProps) {
  return (
    <TableCell
      onDoubleClick={onDoubleClick}
      data-expanded={isExpanded ? "true" : "false"}
      className={`px-4 py-3 text-gray-900 transition-all select-none cursor-pointer border-r border-gray-100 last:border-r-0 ${isExpanded
        ? "whitespace-normal break-words max-w-md bg-gray-50/80 font-medium text-gray-950 shadow-inner"
        : "max-w-xs overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden hover:bg-gray-50/40"
        }`}
      title="Double click to expand / collapse"
    >
      {value}
    </TableCell>
  );
}

export const SubmissionsTable = ({ form, submissions }: Props) => {
  const [expandedCellKey, setExpandedCellKey] = useState<string | null>(null);

  const fields = form.publishedFields && form.publishedFields.length > 0
    ? form.publishedFields
    : form.fields || [];

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const expandedCell = document.querySelector('[data-expanded="true"]');
      if (expandedCell && !expandedCell.contains(event.target as Node)) {
        setExpandedCellKey(null);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, { capture: true });
    };
  }, []);

  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg bg-white shadow-sm">
      <Table className="w-full text-sm text-left">
        <TableHeader className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="px-4 py-3 h-auto font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">
              Submitted at
            </TableHead>
            {fields.map((field) => (
              <TableHead
                key={field.id}
                className="px-4 py-3 h-auto font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap"
              >
                {field.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {submissions.map((sub) => (
            <TableRow key={sub._id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {new Date(sub.createdAt).toLocaleString()}
              </TableCell>
              {fields.map((field) => {
                // Find the answer for this specific field
                const answer = sub.answers?.find((a) => a.fieldId === field.id);
                const cellKey = `${sub._id}-${field.id}`;
                return (
                  <SubmissionCell
                    key={field.id}
                    value={answer ? String(answer.value) : "—"}
                    isExpanded={expandedCellKey === cellKey}
                    onDoubleClick={() => {
                      setExpandedCellKey((prev) =>
                        prev === cellKey ? null : cellKey
                      );
                    }}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

