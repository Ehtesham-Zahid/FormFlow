"use client";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Hero from "@/src/features/marketing/components/Hero";
import About from "@/src/features/marketing/components/About";
import Features from "@/src/features/marketing/components/Features";
import Faq from "@/src/features/marketing/components/Faq";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function PublicLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFAF7] text-black font-sans selection:bg-indigo-500 selection:text-white">
      {/* Premium High-Contrast Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Document-Style Interactive Hero */}
        <Hero />

        {/* Neo-brutalist Feature Details */}
        <Features />

        {/* Editorial Value Section */}
        <About />

        {/* Collapsible Accordion FAQs */}
        <Faq />

        {/* Neo-brutalist Flat Banner CTA */}
        <section className="py-28 bg-indigo-500 text-white font-sans text-center relative overflow-hidden border-t-2 border-b-2 border-black">
          {/* Grid pattern masks */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-[0.07]" />
          
          <div className="mx-auto max-w-4xl px-6 relative z-10 flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-xs font-black text-black shadow-[2px_2px_0px_0px_#000000]">
              <Sparkles className="h-4 w-4 text-indigo-500 fill-indigo-500" />
              <span>Try it in 60 seconds</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight">
              Ready to build <br /> your first form?
            </h2>
            
            <p className="text-indigo-50 max-w-xl mx-auto text-base sm:text-lg font-bold leading-relaxed">
              Create an account now and construct beautiful, responsive document-like forms with zero learning curve. It's completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button className="w-full rounded-2xl border-2 border-black bg-white hover:bg-gray-50 text-black font-black py-7 px-10 text-lg shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all duration-150 gap-3 cursor-pointer">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login" className="text-sm font-black text-white hover:underline underline-offset-4 py-2.5">
                Sign In &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Outlined Footer */}
      <Footer />
    </div>
  );
}
