import { BarChart2 } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
      <BarChart2 size={28} className="text-gray-300" />
      <p className="text-sm font-medium text-gray-600">Insights coming soon</p>
      <p className="text-xs text-gray-400">
        View completion rates, drop-offs, and response trends.
      </p>
    </div>
  );
}
