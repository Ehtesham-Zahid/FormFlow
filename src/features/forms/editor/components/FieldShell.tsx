"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Trash2, ToggleLeft, ToggleRight, GripVertical, Copy } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

type Props = {
  children: React.ReactNode;
  required: boolean;
  onToggleRequired: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
};

export default function FieldShell({
  children,
  required,
  onToggleRequired,
  onDelete,
  onDuplicate,
  dragHandleProps,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  // Tracks whether the field's LABEL input (inside children) has focus.
  // Intentionally NOT set when the grip button itself receives focus —
  // that would cause the old field's icon to linger after duplicate/delete.
  const [focused, setFocused] = useState(false);

  const showIcon = hovered || open || focused;

  return (
    <div
      className="relative py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        if (!open) setHovered(false);
      }}
    >
      {/* Left handle — visible on hover, field-content focus, or when popover open */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!open) setHovered(false);
        }}
        className={cn(
          "absolute right-full mr-2 top-1 pt-[3px] transition-opacity duration-150",
          showIcon ? "opacity-100" : "opacity-0",
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
              {...dragHandleProps}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-6 w-6 rounded cursor-grab active:cursor-grabbing transition-colors"
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

            {/* Duplicate */}
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setHovered(false);
                onDuplicate?.();
              }}
              className="flex items-center justify-start gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-normal"
            >
              <Copy size={14} />
              <span>Duplicate field</span>
            </Button>

            {/* Delete */}
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setHovered(false);
                onDelete?.();
              }}
              className="flex items-center justify-start gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors font-normal"
            >
              <Trash2 size={14} />
              <span>Delete field</span>
            </Button>

          </PopoverContent>
        </Popover>
      </div>

      {/* Field content — onFocus/onBlur here track label input focus only,
          NOT the grip button (which sits outside this div) */}
      <div
        className="w-full min-w-0"
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          // Only clear focused when focus leaves this div entirely
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setFocused(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}


