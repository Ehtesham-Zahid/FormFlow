"use client";

import { useState } from "react";
import { Eye, Globe, Loader2, Share2, Inbox, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { IField } from "@/src/types/form.types";
import PreviewModal from "./PreviewModal";
import { Button } from "@/src/components/ui/button";

type Status = "draft" | "published";

type Props = {
  title: string;
  status: Status;
  fields: IField[];
  formId: string;
  onPublish: () => Promise<void>;
};

export default function EditorHeader({
  title,
  status,
  fields,
  formId,
  onPublish,
}: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<Status>(status);
  const router = useRouter();

  const handlePublish = async () => {
    const isFirstPublish = currentStatus === "draft";
    setPublishing(true);
    try {
      await onPublish();
      setCurrentStatus("published");
      if (isFirstPublish) {
        router.push(`/forms/${formId}/share`);
      }
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <header className="h-14 border border-gray-200 shadow-sm bg-white flex items-center justify-between px-5 shrink-0 rounded-xl">
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
          {/* Quick Links */}
          <div className="flex items-center gap-1 mr-2 pr-4 border-r border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/forms/${formId}/share`)}
              className="h-8 w-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Share"
            >
              <Share2 size={16} strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/forms/${formId}/submissions`)}
              className="h-8 w-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Submissions"
            >
              <Inbox size={16} strokeWidth={2} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/forms/${formId}/integrations`)}
              className="h-8 w-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Integrations"
            >
              <Puzzle size={16} strokeWidth={2} />
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900
                       hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors h-9"
          >
            <Eye size={14} strokeWidth={2} />
            Preview
          </Button>

          <Button
            onClick={handlePublish}
            disabled={publishing}
            className={cn(
              "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md font-medium transition-all h-9",
              "bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]",
              publishing && "opacity-70 cursor-not-allowed",
            )}
          >
            {publishing ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Globe size={13} strokeWidth={2} />
            )}
            {publishing
              ? "Publishing…"
              : currentStatus === "published"
                ? "Publish Changes"
                : "Publish"}
          </Button>
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
