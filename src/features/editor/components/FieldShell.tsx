"use client";

import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Trash2, ToggleLeft, ToggleRight, GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

type Props = {
  children: React.ReactNode;
  required: boolean;
  onToggleRequired: () => void;
  onDelete?: () => void;
};

export default function FieldShell({
  children,
  required,
  onToggleRequired,
  onDelete,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        if (!open) setHovered(false);
      }}
    >
      {/* Left handle — visible on hover, popover open, or when field is focused */}
      <div
        className={cn(
          "absolute right-full mr-2 top-1 pt-[3px] transition-opacity duration-150",
          hovered || open
            ? "opacity-100"
            : "opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
        )}
      >
        <Popover
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setHovered(false);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-6 w-6 rounded cursor-pointer transition-colors"
              aria-label="Field options"
            >
              <GripVertical size={15} strokeWidth={1.8} />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="left"
            align="start"
            className="w-52 p-1 rounded-lg shadow-lg border border-gray-100 bg-white"
          >
            {/* Required toggle */}
            <Button
              variant="ghost"
              onClick={() => {
                onToggleRequired();
                setOpen(false);
              }}
              className="flex items-center justify-start gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-normal"
            >
              {required ? (
                <ToggleRight size={15} className="text-blue-500" />
              ) : (
                <ToggleLeft size={15} className="text-gray-400" />
              )}
              <span>Required</span>
              {required && (
                <span className="ml-auto text-xs text-blue-500 font-medium">
                  On
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="my-1 h-px bg-gray-100" />

            {/* Delete */}
            <Button
              variant="ghost"
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="flex items-center justify-start gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors font-normal"
            >
              <Trash2 size={14} />
              <span>Delete field</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Field content — label heading + input preview */}
      <div className="w-full min-w-0">{children}</div>
    </div>
  );
}
