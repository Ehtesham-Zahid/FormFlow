"use client";

import { Sparkles, Edit3, ArrowRight, Zap, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function About() {
  const points = [
    {
      emoji: "✍️",
      title: "Built like a text editor",
      desc: "Creating a form shouldn't feel like programming. If you know how to write a doc, you already know how to use FormFlow. Type headers, drop descriptions, and insert questions in-place.",
    },
    {
      emoji: "⚡",
      title: "Designed for rapid typing",
      desc: "Speed is our core feature. Skip clicking and dragging from nested sidebars. Build an entire question list in seconds using commands and arrow keystrokes.",
    },
    {
      emoji: "🎨",
      title: "Stunning out-of-the-box",
      desc: "No design degree required. FormFlow utilizes HSL-tailored premium defaults, layout margins, and typography that make forms look highly premium and clean on any device.",
    },
  ];

  return (
    <section id="about" className="py-28 bg-[#FCFAF7] border-b-2 border-black font-sans relative">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Editorial Layout: Left Pitch, Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (Brand Philosophy) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />
              <span>Our Philosophy</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-black leading-[1.1] tracking-tight">
              Forms should be simple, clean, and fast.
            </h2>
            
            <p className="text-lg text-gray-700 font-semibold leading-relaxed">
              We started FormFlow with a simple premise: form building is broken. Side-panels and modal builders waste your time and create clunky user experiences. 
            </p>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              Our editor is completely minimalist, ensuring that you can construct forms and inspect submission data without distractions or bloated layout rules.
            </p>

            <div className="pt-4">
              <Link href="/signup">
                <Button className="rounded-2xl border-2 border-black bg-indigo-500 text-white font-bold py-6 px-8 shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000000] transition-all cursor-pointer">
                  Create a form in 60s
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (Tactile Points Grid) */}
          <div className="lg:col-span-7 space-y-8">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="flex gap-6 rounded-3xl border-2 border-black bg-white p-8 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-indigo-50 text-2xl shadow-[2px_2px_0px_0px_#000000]">
                  {pt.emoji}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-black">{pt.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
