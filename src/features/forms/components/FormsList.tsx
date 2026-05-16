import { FormCard } from "./FormCard";

type Props = {
  forms: any[];
  onDelete: (id: string) => void;
};

export const FormsList = ({ forms, onDelete }: Props) => {
  return (
    <div className="flex flex-col">
      {forms?.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onDelete={() => onDelete(form.id)}
        />
      ))}
    </div>
  );
};
