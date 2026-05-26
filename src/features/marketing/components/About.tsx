"use client";

import { Feather, Cpu, LayoutGrid, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Feather,
      title: "Clean by default",
      desc: "No clutter, no unnecessary wrappers. FormFlow features standard, carefully curated spacing and typography, ensuring your forms look stunning on any screen without manual tweaking.",
    },
    {
      icon: Cpu,
      title: "Focused Workspace",
      desc: "Inspired by modern developer tools and writing workspaces, the keyboard is your command center. Use slash commands and arrow navigation to build without leaving your home keys.",
    },
    {
      icon: LayoutGrid,
      title: "Tactile feedback",
      desc: "Drag & drop fields visually, duplicate with a single click, and navigate inline with instant response times. Crafting forms feels like building with physical lego blocks.",
    },
    {
      icon: Heart,
      title: "For Builders who care",
      desc: "Created for creators, developers, and teams who care deeply about design. Don't compromise your brand's aesthetics with generic form builders.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50/30 border-y border-gray-100 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">Our Philosophy</h2>
          <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why FormFlow exists
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Legacy form builders are complex, slow, and generate clunky, outdated forms. We built FormFlow to solve this—combining raw speed with gorgeous design.
          </p>
        </div>

        {/* Philosophy grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => {
            const IconComponent = val.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-gray-100 bg-white p-8 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-teal-500 group-hover:text-white transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
