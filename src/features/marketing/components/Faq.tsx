"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

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
      question: "Is there a premium limit on fields or forms created?",
      answer:
        "FormFlow is built to be accessible. You can create multiple forms and build fields with no strict arbitrary limitations. We want you to have a great time building outstanding form interfaces.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50/30 border-t border-gray-100 font-sans">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600">Got Questions?</h2>
          <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about building, organizing, and collecting responses with FormFlow.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 bg-white ${
                  isOpen
                    ? "border-indigo-200 shadow-md shadow-indigo-50/50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-indigo-600" : "text-gray-400"
                    }`} />
                    <span className="font-bold text-gray-900 leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-indigo-50 text-indigo-600" : ""
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Content Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 border-t border-gray-50" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 text-sm text-gray-500 leading-relaxed bg-gray-50/20">
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
