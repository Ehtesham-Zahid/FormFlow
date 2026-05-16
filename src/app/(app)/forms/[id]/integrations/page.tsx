import { Puzzle } from "lucide-react";

const INTEGRATIONS = [
  {
    name: "Slack",
    description: "Get notified on every new submission.",
    soon: false,
  },
  {
    name: "Google Sheets",
    description: "Sync responses to a spreadsheet automatically.",
    soon: false,
  },
  {
    name: "Zapier",
    description: "Connect to 5,000+ apps via Zapier.",
    soon: true,
  },
  {
    name: "Webhooks",
    description: "Send submission data to any endpoint.",
    soon: true,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-lg font-semibold text-gray-900 mb-1">Integrations</h1>
      <p className="text-sm text-gray-500 mb-8">
        Connect your form to the tools you already use.
      </p>

      <div className="flex flex-col gap-3">
        {INTEGRATIONS.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between px-4 py-4 border border-gray-200
                       rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                <Puzzle size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>

            {item.soon ? (
              <span
                className="text-[10px] font-medium px-2 py-0.5 bg-gray-100
                               text-gray-400 rounded select-none"
              >
                Soon
              </span>
            ) : (
              <button
                className="text-xs font-medium px-3 py-1.5 border border-gray-200
                                 rounded-md text-gray-600 hover:border-gray-400 transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
