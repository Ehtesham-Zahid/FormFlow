"use client";

import { Type, ArrowUpDown, Table, Layout, ToggleRight, Sparkles } from "lucide-react";

export default function Features() {
  const list = [
    {
      icon: Type,
      title: "Slash commands",
      badge: "Fastest flow",
      desc: "Simply type '/' inside the editor to trigger our dropdown menu. Press enter on any element like Text, Email, or Checkbox to instantly insert it. Build complex forms entirely from your keyboard.",
    },
    {
      icon: ArrowUpDown,
      title: "Tactile Drag & Drop",
      badge: "Seamless movement",
      desc: "Fully responsive, smooth reordering using @dnd-kit under the hood. Grab any field by the drag handle and position it exactly where you want with beautiful, physical drag-and-drop feedback.",
    },
    {
      icon: Table,
      title: "Response Management",
      badge: "Real-time insights",
      desc: "No more messy spreadsheets. Collect submissions automatically, inspect high-quality table views, and track real-time response rates in a workspace crafted to make analysis incredibly simple.",
    },
    {
      icon: Layout,
      title: "Notion-style Editor",
      badge: "Distraction free",
      desc: "A sleek, content-focused page layout that feels familiar. Keep your flow state active with clear headers, minimalist borders, and inline editable headings that replace clunky modal properties.",
    },
    {
      icon: ToggleRight,
      title: "Autosave",
      badge: "Zero worry",
      desc: "Every single keystroke, option change, or drag action triggers an intelligent background autosave process. Sleep easy knowing your workspace is always up-to-date and fully synchronized.",
    },
    {
      icon: Sparkles,
      title: "Modern Aesthetics",
      badge: "Stunning designs",
      desc: "Featuring HSL-tailored premium default layouts, glassmorphic styling, smooth CSS micro-interactions, and premium typography. FormFlow is designed to make a stellar first impression.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">Product Highlights</h2>
          <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A faster way to create forms
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Engineered with a focus on speed, responsiveness, and premium visual design. Say goodbye to generic layouts and slow creation times.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  {/* Icon & Badge row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase bg-indigo-50 border border-indigo-100/50 px-2.5 py-1 rounded-full tracking-wider">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Bottom decorative accent border line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-indigo-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
