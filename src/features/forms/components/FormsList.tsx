import { FormCard } from "./FormCard";

type Props = {
  forms: any[];
  onDelete: (id: string) => void;
};

export const FormsList = ({ forms, onDelete }: Props) => {
  if (!forms || forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        <h3 className="text-lg font-medium text-gray-900">No forms created yet</h3>
        <p className="text-sm text-gray-500 mt-1">Click the "New Form" button above to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onDelete={() => onDelete(form.id)}
        />
      ))}
    </div>
  );
};
