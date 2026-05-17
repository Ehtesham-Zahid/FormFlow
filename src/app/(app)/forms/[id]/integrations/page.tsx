import { Puzzle } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
      <Puzzle size={28} className="text-gray-300" />
      <p className="text-sm font-medium text-gray-600">Integrations coming soon</p>
      <p className="text-xs text-gray-400">
        Connect your form to the tools you already use like Slack and Google Sheets.
      </p>
    </div>
  );
}
