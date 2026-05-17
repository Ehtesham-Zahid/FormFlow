"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { PenLine, Share2, BarChart2, Puzzle, Inbox } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const tabs = [
  { label: "Share", href: "share", icon: Share2 },
  { label: "Submissions", href: "submissions", icon: Inbox },
  { label: "Insights", href: "insights", icon: BarChart2 },
  { label: "Integrations", href: "integrations", icon: Puzzle },
];

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id: formId } = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const { data: form } = useForm(formId);

  const isEditPage = pathname.endsWith('/edit');

  if (isEditPage) {
    return <div className="h-screen w-full">{children}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Tab nav */}
      <div className="h-11 border-b border-gray-100 bg-white flex items-center px-2 sm:px-4 shrink-0 justify-between gap-2">
        <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
          <span className="text-sm font-medium text-gray-700 truncate max-w-[100px] sm:max-w-[200px] mr-1 sm:mr-4 shrink-0">
            {form?.title || "Untitled form"}
          </span>

          {tabs.map((tab) => {
            const isActive = pathname.endsWith(`/${tab.href}`);
            const Icon = tab.icon;
            return (
              <Button
                variant="ghost"
                key={tab.href}
                onClick={() => router.push(`/forms/${formId}/${tab.href}`)}
                className={cn(
                  "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-sm transition-colors h-8",
                  isActive
                    ? "bg-gray-100 text-gray-900 font-medium hover:bg-gray-200"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-normal",
                )}
              >
                <Icon size={13} strokeWidth={1.8} />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>
        
        {/* Edit Button on the right */}
        <Button
          onClick={() => router.push(`/forms/${formId}/edit`)}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors h-8 shrink-0"
        >
          <PenLine size={13} strokeWidth={2} />
          <span className="hidden sm:inline">Edit Form</span>
        </Button>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
