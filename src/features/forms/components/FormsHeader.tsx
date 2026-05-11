"use client";

import { Button } from "@/src/components/ui/button";

type Props = {
  onCreate?: () => void;
  isLoading?: boolean;
};

export const FormsHeader = ({ onCreate, isLoading }: Props) => {
  return (
    <div className="flex items-center justify-between">
      {/* LEFT SIDE */}
      <div>
        <h1 className="text-2xl font-semibold">My Forms</h1>
        <p className="text-sm text-muted-foreground">
          Create, manage, and track all your forms in one place
        </p>
      </div>

      {/* RIGHT ACTION */}
      {isLoading ? (
        <Button
          disabled
          className="bg-primary/50 text-white  cursor-not-allowed"
        >
          Creating...
        </Button>
      ) : (
        <Button
          onClick={onCreate}
          className="bg-primary text-white cursor-pointer"
        >
          + New Form
        </Button>
      )}
    </div>
  );
};
