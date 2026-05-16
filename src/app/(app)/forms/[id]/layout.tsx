"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { useForm } from "@/src/features/forms/hooks/useForm";
import { PenLine, Share2, BarChart2, Puzzle, Inbox } from "lucide-react";

const tabs = [
  { label: "Edit", href: "edit", icon: PenLine },
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

  return (
    <div className="flex flex-col h-screen">
      {/* Tab nav */}
      <div className="h-11 border-b border-gray-100 bg-white flex items-center px-4 gap-1 shrink-0">
        <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] mr-4">
          {form?.title || "Untitled form"}
        </span>

        {tabs.map((tab) => {
          const isActive = pathname.endsWith(`/${tab.href}`);
          const Icon = tab.icon;
          return (
            <button
              key={tab.href}
              onClick={() => router.push(`/forms/${formId}/${tab.href}`)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50",
              )}
            >
              <Icon size={13} strokeWidth={1.8} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
