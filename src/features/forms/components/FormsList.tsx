import { FormCard } from "./FormCard";

type Props = {
  forms: any[];
  onDelete: (id: string) => void;
};

export const FormsList = ({ forms, onDelete }: Props) => {
  return (
    <div className="space-y-3">
      {forms?.map((form: any) => (
        <FormCard
          key={form.id}
          form={form}
          onDelete={() => onDelete(form.id)}
        />
      ))}
    </div>
  );
};
