"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { IField } from "@/src/types/form.types";
import FormPreview from "./FormPreview";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: IField[];
};

export default function PreviewModal({ open, onClose, title, fields }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-150">
      {/* Top bar */}
      <div className="h-12 border-b border-gray-100 flex items-center justify-between px-5 shrink-0 bg-white">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-gray-600
                     hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back to editor
        </button>

        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase select-none">
          Preview
        </span>

        {/* Spacer to visually center the label */}
        <div className="w-[120px]" />
      </div>

      {/* Scrollable form area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <FormPreview title={title} fields={fields} />
      </div>
    </div>
  );
}
