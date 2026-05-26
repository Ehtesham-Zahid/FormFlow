"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items: FaqItem[] = [
    {
      question: "How do Notion-style Slash Commands work?",
      answer:
        "Simply type '/' while focused on the ghost input area. A sleek floating dropdown menu will immediately open, letting you browse and search field types (text, email, radio, etc.) using your mouse or arrow keys. Pressing Enter instantly creates and injects that field in-place.",
    },
    {
      question: "Is my form work saved automatically?",
      answer:
        "Yes! Every change you make—including renaming labels, editing drop-down options, toggling required switches, duplicating fields, or dragging card positions—triggers an intelligent debounced background autosave to your secure account.",
    },
    {
      question: "Can I drag and drop fields to rearrange them?",
      answer:
        "Absolutely. We support highly tactile drag-and-drop ordering powered by @dnd-kit. Each field card features a dedicated drag icon. Simply click and drag the handle to smoothly slide fields up or down.",
    },
    {
      question: "Can I collect responses and view analytical insights?",
      answer:
        "Yes. FormFlow gathers all user submissions in real-time. You can view response lists, analyze insights in beautiful clean tables, and track submission rates in a modern, easy-to-use workspace designed for builders.",
    },
    {
      question: "Is there a limit on fields or forms created?",
      answer:
        "FormFlow is built to be accessible. You can create multiple forms and build fields with no strict arbitrary limitations. We want you to have a great time building outstanding form interfaces.",
    },
  ];

  return (
    <section id="faq" className="py-28 bg-[#FCFAF7] border-b-2 border-black font-sans">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-black bg-white px-3 py-1 text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000000]">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-semibold text-gray-700 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about building, organizing, and collecting responses with FormFlow.
          </p>
        </div>

        {/* Accordion List (Tally Neo-Brutalist Accordions) */}
        <div className="space-y-6">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000000] transition-all duration-150 ${
                  isOpen ? "translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000000]" : ""
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="text-xl">💬</span>
                    <span className="font-extrabold text-black text-base leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border-2 border-black bg-indigo-50 text-black transition-all duration-150 ${
                    isOpen ? "rotate-180 bg-indigo-500 text-white" : ""
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Content Panel */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 border-t-2 border-black" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 text-sm font-semibold text-gray-600 leading-relaxed bg-[#FCFAF7]/40">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
