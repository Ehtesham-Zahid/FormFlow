"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Link2, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button } from "@/src/components/ui/button";

type Form = {
  id: string;
  title: string;
  status: "draft" | "published";
  submissionsCount?: number;
  updatedAt: string;
};

type Props = {
  form: Form;
  onDelete: () => void;
};

export const FormCard = ({ form, onDelete }: Props) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const isDraft = form.status === "draft";

  const formattedDate = new Date(form.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const submissionText = () => {
    if (isDraft) return null;
    const count = form.submissionsCount ?? 0;
    if (count === 0) return "No submissions yet";
    if (count === 1) return "1 submission";
    return `${count} submissions`;
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/f/${form.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider delayDuration={400}>
      <div
        onClick={() => router.push(`/forms/${form.id}/edit`)}
        className="group flex items-center justify-between px-4 py-3.5 rounded-lg
                   hover:bg-gray-100 cursor-pointer transition-colors duration-100 border border-transparent
                   hover:border-gray-200"
      >
        {/* Left — title + meta */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Form icon */}
          <div
            className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0
                          group-hover:bg-white group-hover:border group-hover:border-gray-200 transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="1" width="12" height="2" rx="1" fill="#9ca3af" />
              <rect x="1" y="5" width="8" height="2" rx="1" fill="#9ca3af" />
              <rect x="1" y="9" width="10" height="2" rx="1" fill="#9ca3af" />
            </svg>
          </div>

          {/* Title + meta */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800 truncate">
                {form.title || "Untitled form"}
              </span>
              {isDraft && (
                <span
                  className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5
                                 bg-gray-100 text-gray-500 rounded select-none shrink-0"
                >
                  Draft
                </span>
              )}
            </div>

            {/* Date + submissions below title */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">
                Edited {formattedDate}
              </span>
              {!isDraft && (
                <>
                  <span className="text-gray-200 text-xs">•</span>
                  <span className="text-xs text-gray-400">
                    {submissionText()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right — icon actions on hover */}
        <div className="flex items-center gap-0.5 shrink-0 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/forms/${form.id}/edit`);
                }}
                className="h-7 w-7 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Pencil size={14} strokeWidth={1.8} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Edit form
            </TooltipContent>
          </Tooltip>

          {/* Copy link */}
          {!isDraft && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyLink}
                  className="h-7 w-7 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {copied ? (
                    <Check
                      size={14}
                      strokeWidth={1.8}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Link2 size={14} strokeWidth={1.8} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {copied ? "Copied!" : "Copy share link"}
              </TooltipContent>
            </Tooltip>
          )}

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-7 w-7 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} strokeWidth={1.8} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Delete form
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
