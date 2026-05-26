"use client";

import { Sparkles, Terminal, ArrowUpDown, Database, Layout, RefreshCw, Key } from "lucide-react";

export default function Features() {
  const list = [
    {
      icon: Terminal,
      title: "Notion Slash Commands",
      badge: "Keyboard-First",
      emoji: "⌨️",
      desc: "Speed up your form building exponentially. Type '/' on any line to pull up a text-searchable menu of blocks. Select inputs, headings, or media blocks and press Enter to instantly inject them.",
    },
    {
      icon: ArrowUpDown,
      title: "Tactile Reordering",
      badge: "Pure Physics",
      emoji: "✨",
      desc: "Rearrange questions on your document canvas with simple drag actions. Powered by @dnd-kit, the fields slide fluidly with smooth spring physics and instant visual card snapping.",
    },
    {
      icon: Database,
      title: "Tactile Submissions",
      badge: "Clean Tables",
      emoji: "📊",
      desc: "Analyze submission lists, view clean metrics tables, and check rates in a modern, lightweight reporting dashboard. Say goodbye to clunky and heavy third-party sheets.",
    },
    {
      icon: Layout,
      title: "Document Canvas",
      badge: "Minimalist",
      emoji: "📝",
      desc: "Ditch complex, clunky sidebars. The FormFlow canvas works exactly like a text editor—what you write on your screen is precisely what your final respondents see.",
    },
    {
      icon: RefreshCw,
      title: "Real-time Autosave",
      badge: "Zero Latency",
      emoji: "☁️",
      desc: "Your data is valuable. FormFlow schedules and dispatches background autosave queries for every single letter you type, checkbox you toggle, or field you duplicate.",
    },
    {
      icon: Key,
      title: "Clean Developer Flow",
      badge: "Power Users",
      emoji: "⚡",
      desc: "Easily duplicate fields, toggle strict constraints, and customize identifiers. Engineered with TypeScript type safety and pristine Tailwind v4 styling.",
    },
  ];

  return (
    <section id="features" className="py-28 bg-[#FCFAF7] border-b-2 border-black font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />
            <span>Product Highlights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none">
            A faster way to create forms
          </h2>
          <p className="text-lg font-semibold text-gray-700 max-w-xl mx-auto leading-relaxed">
            Ditch the old clunky form builders. FormFlow combines keyboard-driven speed with beautiful document layouts.
          </p>
        </div>

        {/* Neo-brutalist features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {list.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150"
              >
                <div>
                  {/* Top Row with Badge & Emoji */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-indigo-50 text-indigo-600 shadow-[2px_2px_0px_0px_#000000] group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-150">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-black uppercase bg-gray-50 border-2 border-black px-2.5 py-0.5 rounded-lg tracking-wider">
                        {feat.badge}
                      </span>
                      <span className="text-xl">{feat.emoji}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-black mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Neo-brutalist border footer block accent */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <span>Explore Workflow</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
