"use client";

import { useState } from "react";
import { Eye, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { IField } from "@/src/types/form.types";
import PreviewModal from "./PreviewModal";

type Status = "draft" | "published";

type Props = {
  title: string;
  status: Status;
  fields: IField[];
  onPublish: () => Promise<void>;
};

export default function EditorHeader({
  title,
  status,
  fields,
  onPublish,
}: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>(status);

  const handlePublish = async () => {
    if (currentStatus === "published") return;
    setPublishing(true);
    try {
      await onPublish();
      setCurrentStatus("published");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <header className="h-12 border-b border-gray-100 bg-white flex items-center justify-between px-5 shrink-0">
        {/* Left — title + badge */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-medium text-gray-800 truncate max-w-[280px]">
            {title || "Untitled form"}
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border select-none",
              currentStatus === "published"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-gray-50 text-gray-500 border-gray-200",
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                currentStatus === "published"
                  ? "bg-emerald-500"
                  : "bg-gray-400",
              )}
            />
            {currentStatus === "published" ? "Published" : "Draft"}
          </span>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900
                       hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
          >
            <Eye size={14} strokeWidth={2} />
            Preview
          </button>

          <button
            onClick={handlePublish}
            disabled={publishing || currentStatus === "published"}
            className={cn(
              "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md font-medium transition-all",
              currentStatus === "published"
                ? "bg-emerald-50 text-emerald-600 cursor-default"
                : "bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]",
              publishing && "opacity-70 cursor-not-allowed",
            )}
          >
            {publishing ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Globe size={13} strokeWidth={2} />
            )}
            {currentStatus === "published"
              ? "Published"
              : publishing
                ? "Publishing…"
                : "Publish"}
          </button>
        </div>
      </header>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={title}
        fields={fields}
      />
    </>
  );
}
