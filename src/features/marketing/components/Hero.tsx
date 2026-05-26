"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Play, Eye, FileText, CheckSquare, CircleDot, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Hero() {
  // Live mockup state
  const [isPlaying, setIsPlaying] = useState(false); // To toggle between Editor mode and Form Preview mode
  const [formTitle, setFormTitle] = useState("✨ Feedback & Strategy Session");
  const [fields, setFields] = useState([
    { id: "1", type: "text", label: "What is your main goal for this quarter?", value: "" },
    { id: "2", type: "radio", label: "How did you hear about FormFlow?", options: ["Twitter / X", "Product Hunt", "Word of mouth"], selected: "" },
    { id: "3", type: "checkbox", label: "Would you like to join our invite-only community?", checked: false },
  ]);
  const [activeIndex, setActiveIndex] = useState("1");

  const updateLabel = (id: string, newLabel: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, label: newLabel } : f)));
  };

  const toggleOption = (fieldId: string, optionIndex: number) => {
    setFields(
      fields.map((f) => {
        if (f.id === fieldId && f.type === "radio") {
          return { ...f, selected: f.options?.[optionIndex] || "" };
        }
        return f;
      })
    );
  };

  const toggleCheckbox = (fieldId: string) => {
    setFields(
      fields.map((f) => {
        if (f.id === fieldId && f.type === "checkbox") {
          return { ...f, checked: !f.checked };
        }
        return f;
      })
    );
  };

  return (
    <section className="relative bg-[#FCFAF7] pt-16 pb-28 border-b-2 border-black font-sans overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Playful Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000] mb-8 animate-bounce">
          <Sparkles className="h-4 w-4 text-indigo-500 fill-indigo-500" />
          <span>The Notion of Form Builders ✦ Free & Unlimited</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl font-black tracking-tight text-black sm:text-7xl leading-[1.05] mb-6">
          The simplest way <br /> to create{" "}
          <span className="relative inline-block">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
              beautiful forms
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-gray-700 font-semibold leading-relaxed mb-10">
          Write your questions just like a document. No clunky sidebars, no drag-and-drop complexity. FormFlow is a new type of form builder that works like a text editor.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-20">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button className="w-full rounded-2xl border-2 border-black bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-7 px-10 text-lg shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150 gap-3 cursor-pointer">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-2xl border-2 border-black bg-white hover:bg-gray-50 text-black font-bold py-7 px-10 text-lg shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150 cursor-pointer">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Live Tally-Style Interactive Editor Mockup */}
        <div className="w-full max-w-4xl border-2 border-black bg-white rounded-3xl shadow-[8px_8px_0px_0px_#000000] overflow-hidden text-left relative">
          
          {/* Header Bar */}
          <div className="border-b-2 border-black bg-indigo-50 px-6 py-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-black bg-red-400" />
              <span className="w-3.5 h-3.5 rounded-full border border-black bg-yellow-400" />
              <span className="w-3.5 h-3.5 rounded-full border border-black bg-green-400" />
            </div>
            
            {/* View/Editor Toggle Control */}
            <div className="flex border-2 border-black rounded-xl overflow-hidden bg-white p-0.5 shadow-[2px_2px_0px_0px_#000000]">
              <button
                onClick={() => setIsPlaying(false)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  !isPlaying ? "bg-black text-white" : "hover:bg-gray-100 text-black"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                Document Editor
              </button>
              <button
                onClick={() => setIsPlaying(true)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  isPlaying ? "bg-black text-white" : "hover:bg-gray-100 text-black"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                Live Form Preview
              </button>
            </div>

            <div className="text-[10px] font-bold text-gray-500 font-mono hidden sm:block">
              formflow.co/feedback-survey
            </div>
          </div>

          {/* Interactive Document Sheet Canvas */}
          <div className="p-8 sm:p-12 min-h-[420px] bg-[#FCFAF7]/10 flex flex-col justify-between">
            
            <div className="space-y-8 max-w-2xl">
              
              {/* Form Title (Interactive) */}
              <div className="border-b-2 border-transparent hover:border-gray-200 focus-within:border-black transition-colors duration-150 pb-2">
                {isPlaying ? (
                  <h2 className="text-3xl font-black text-black leading-tight">{formTitle}</h2>
                ) : (
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full text-3xl font-black text-black border-none outline-none bg-transparent placeholder-gray-300 font-sans"
                    placeholder="Form Title..."
                  />
                )}
              </div>

              {/* Form Fields Render */}
              <div className="space-y-8">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    onClick={() => setActiveIndex(field.id)}
                    className={`relative border-l-2 pl-6 transition-all duration-200 ${
                      !isPlaying && activeIndex === field.id
                        ? "border-indigo-500"
                        : "border-transparent"
                    }`}
                  >
                    {/* Label/Question */}
                    <div className="mb-2">
                      {isPlaying ? (
                        <p className="font-bold text-black text-[15px]">{field.label}</p>
                      ) : (
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateLabel(field.id, e.target.value)}
                          className="font-bold text-black text-[15px] w-full outline-none bg-transparent border-b border-transparent focus:border-gray-300"
                        />
                      )}
                    </div>

                    {/* Field input options */}
                    {field.type === "text" && (
                      <input
                        type="text"
                        disabled={!isPlaying}
                        placeholder={isPlaying ? "Type your answer..." : "Plain text field"}
                        className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 text-sm shadow-[2px_2px_0px_0px_#000000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000000] transition-all outline-none"
                      />
                    )}

                    {field.type === "radio" && (
                      <div className="space-y-2">
                        {field.options?.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={!isPlaying}
                            onClick={() => toggleOption(field.id, oIdx)}
                            className={`w-full flex items-center gap-3 border-2 border-black rounded-xl px-4 py-3 text-sm font-bold shadow-[2px_2px_0px_0px_#000000] transition-all ${
                              isPlaying ? "cursor-pointer" : "cursor-default"
                            } ${
                              field.selected === opt
                                ? "bg-indigo-500 text-white translate-x-[2px] translate-y-[2px] shadow-[0px_0px_0px_0px_#000000]"
                                : "bg-white text-black hover:bg-gray-50"
                            }`}
                          >
                            <CircleDot className={`h-4 w-4 ${field.selected === opt ? "fill-white" : ""}`} />
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {field.type === "checkbox" && (
                      <button
                        disabled={!isPlaying}
                        onClick={() => toggleCheckbox(field.id)}
                        className={`flex items-center gap-3 border-2 border-black rounded-xl px-4 py-3 text-sm font-bold shadow-[2px_2px_0px_0px_#000000] transition-all ${
                          isPlaying ? "cursor-pointer" : "cursor-default"
                        } ${
                          field.checked
                            ? "bg-indigo-500 text-white translate-x-[2px] translate-y-[2px] shadow-[0px_0px_0px_0px_#000000]"
                            : "bg-white text-black hover:bg-gray-50"
                        }`}
                      >
                        <CheckSquare className={`h-4 w-4 ${field.checked ? "fill-white text-indigo-500" : ""}`} />
                        <span>Join the community</span>
                      </button>
                    )}

                    {/* Notion block creation hint (Editor-only) */}
                    {!isPlaying && activeIndex === field.id && (
                      <div className="absolute top-0 -left-12 flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white text-gray-400 shadow-sm text-xs font-mono font-bold select-none cursor-grab">
                        ⋮⋮
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Slash Input Prompt (Editor-only) */}
              {!isPlaying && (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center justify-between bg-gray-50/20 hover:bg-gray-50/50 hover:border-black transition-colors duration-150 cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-xs font-mono font-black bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded shadow-sm">/</span>
                    <span className="text-xs font-semibold">Type <span className="font-bold text-gray-600">/</span> to create fields (text, email, select)...</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              )}

            </div>

            {/* Hint alert at bottom of mockup */}
            <div className="mt-12 pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <p className="text-xs font-bold text-black">
                  {!isPlaying
                    ? "✨ Notion editor mode: Click and edit question text above directly!"
                    : "🚀 Preview mode: Interact with the buttons to fill out the form!"}
                </p>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs font-black text-indigo-600 hover:text-indigo-800 underline decoration-2 cursor-pointer"
              >
                {!isPlaying ? "Toggle Preview →" : "Back to Editor view &larr;"}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
