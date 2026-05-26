"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Hero() {
  // Mini interactive state for the live preview card
  const [fields, setFields] = useState([
    { id: "1", type: "text", label: "Full Name", placeholder: "e.g. Alex Carter" },
    { id: "2", type: "email", label: "Email Address", placeholder: "e.g. alex@example.com" },
  ]);
  const [selectedField, setSelectedField] = useState("1");
  const [formTitle, setFormTitle] = useState("User Experience Survey");

  const updateLabel = (id: string, newLabel: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, label: newLabel } : f)));
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.06),rgba(255,255,255,0))] font-sans">
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 h-96 w-96 rounded-full bg-teal-400/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-12 lg:gap-12 items-center">
        
        {/* Pitch Column */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          
          {/* Badge */}
          <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
            <Sparkles className="h-4 w-4 animate-pulse text-indigo-600" />
            <span>Form building, reimagined.</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-[1.1] font-sans">
            Create beautiful forms <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              without the clutter.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
            Build forms, collect responses, and analyze feedback in a gorgeous, distraction-free interface. Inspired by modern editors you already love using daily.
          </p>

          {/* Bullet Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              <span>Notion-style Slash Commands</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              <span>Tactile Drag & Drop ordering</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              <span>Clean response tables & charts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              <span>Lightning-fast keyboard flow</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/signup" className="flex-1 sm:flex-initial">
              <Button className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-8 text-base shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-0.5 transition-all duration-300 gap-2 cursor-pointer">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features" className="flex-1 sm:flex-initial">
              <Button variant="outline" className="w-full rounded-2xl border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-6 px-8 text-base transition-colors duration-200 cursor-pointer">
                Explore Features
              </Button>
            </Link>
          </div>

        </div>

        {/* Live Mockup Column */}
        <div className="mt-16 lg:mt-0 lg:col-span-5 flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-200/80 relative">
            
            {/* Glossy card frame border top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500" />
            
            {/* Floating Hint Tag */}
            <div className="absolute -top-3 right-6 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 select-none">
              <Terminal className="h-3 w-3 text-teal-400" />
              <span>Try editing the form</span>
            </div>

            {/* simulated editor container */}
            <div className="space-y-6">
              
              {/* Form Title Input */}
              <div className="border-b border-gray-100 pb-4">
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-800 border-none outline-none focus:ring-0 bg-transparent placeholder-gray-300 font-mono"
                  placeholder="Untitled Form"
                />
                <p className="text-xs text-indigo-500 font-medium mt-1">Live Interactive Editor Preview</p>
              </div>

              {/* Fields mapping */}
              <div className="space-y-4">
                {fields.map((field, idx) => (
                  <div
                    key={field.id}
                    onClick={() => setSelectedField(field.id)}
                    className={`rounded-2xl border p-4 transition-all duration-300 cursor-pointer ${
                      selectedField === field.id
                        ? "border-indigo-500 bg-indigo-50/20 shadow-md shadow-indigo-100/10"
                        : "border-gray-100 bg-gray-50/30 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateLabel(field.id, e.target.value)}
                        className="font-semibold text-sm text-gray-800 outline-none bg-transparent w-full focus:underline border-none"
                      />
                      <span className="text-[10px] text-gray-400 font-mono uppercase bg-white border border-gray-100 px-2 py-0.5 rounded-md">
                        {field.type}
                      </span>
                    </div>

                    <input
                      type="text"
                      disabled
                      placeholder={field.placeholder}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-400 cursor-not-allowed outline-none"
                    />

                    {selectedField === field.id && (
                      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-indigo-100/40 text-[10px] font-semibold text-indigo-600 animate-in fade-in duration-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                        <span>Focused: type to change label</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Slash Input placeholder */}
              <div className="border border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-gray-50/10 hover:bg-gray-50/40 transition-colors">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-xs font-mono font-bold bg-gray-200/50 text-gray-500 px-1.5 py-0.5 rounded">/</span>
                  <span className="text-xs">Type / to add field inline...</span>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 animate-pulse" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
