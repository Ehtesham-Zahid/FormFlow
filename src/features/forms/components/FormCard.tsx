import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

type Props = {
  form: any;
  onDelete: () => void;
};

export const FormCard = ({ form, onDelete }: Props) => {
  return (
    <Card className="p-4 flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="space-y-1">
        <h3 className="font-medium">{form.title}</h3>

        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>

          <span>•</span>

          <span>{form.isArchived ? "Archived" : "Active"}</span>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>

        <Button size="sm" variant="outline">
          View
        </Button>

        <Button size="sm" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};
