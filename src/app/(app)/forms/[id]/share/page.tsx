"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Link2, Check, ExternalLink } from "lucide-react";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { Button } from "@/src/components/ui/button";

export default function SharePage() {
  const { id: formId } = useParams<{ id: string }>();
  const { data: form } = useForm(formId);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/f/${formId}`
      : `/f/${formId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDraft = form?.status === "draft";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-lg font-semibold text-gray-900 mb-1">Share</h1>
      <p className="text-sm text-gray-500 mb-8">
        Share your form with a link or embed it anywhere.
      </p>

      {isDraft && (
        <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          This form is a <strong>draft</strong>. Publish it first before
          sharing.
        </div>
      )}

      {/* Share link block */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Share link
          </p>
        </div>

        <div className="px-4 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div
            className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200
                          rounded-md px-3 py-2 min-w-0"
          >
            <Link2 size={13} className="text-gray-400 shrink-0" />
            <span className="text-sm text-gray-600 truncate">{shareUrl}</span>
          </div>

          <Button
            onClick={handleCopy}
            disabled={isDraft}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md
                       bg-gray-900 text-white hover:bg-gray-700 transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {copied ? (
              <>
                <Check size={13} />
                Copied
              </>
            ) : (
              "Copy link"
            )}
          </Button>
        </div>

        {!isDraft && (
          <div className="px-4 pb-4">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500
                         hover:text-gray-900 transition-colors"
            >
              <ExternalLink size={12} />
              Open form in new tab
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
