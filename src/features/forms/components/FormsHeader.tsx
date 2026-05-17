"use client";

import { Button } from "@/src/components/ui/button";

type Props = {
  onCreate?: () => void;
  isLoading?: boolean;
};

export const FormsHeader = ({ onCreate, isLoading }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* LEFT SIDE */}
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-semibold truncate">My Forms</h1>
        <p className="text-sm text-muted-foreground hidden sm:block">
          Create, manage, and track all your forms in one place
        </p>
      </div>

      {/* RIGHT ACTION */}
      {isLoading ? (
        <Button
          disabled
          className="bg-primary/50 text-white cursor-not-allowed shrink-0"
        >
          Creating...
        </Button>
      ) : (
        <Button
          onClick={onCreate}
          className="bg-primary text-white cursor-pointer shrink-0"
        >
          + New Form
        </Button>
      )}
    </div>
  );
};
