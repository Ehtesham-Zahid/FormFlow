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
    <div className="flex min-h-screen flex-col bg-white text-gray-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sleek Glassmorphic Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Glowing Interactive Hero */}
        <Hero />

        {/* Feature Grid Details */}
        <Features />

        {/* Philosophy / About Section */}
        <About />

        {/* Collapsible Accordion FAQs */}
        <Faq />

        {/* Direct CTA Section */}
        <section className="py-24 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white font-sans text-center relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(20,184,166,0.15),transparent_50%)] pointer-events-none" />

          <div className="mx-auto max-w-4xl px-6 relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-teal-300 uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>Start Building Today</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Create forms your users <br className="hidden sm:inline" />
              will actually enjoy filling out.
            </h2>

            <p className="text-indigo-200 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Join thousands of creators and developers who appreciate clean design, lightning-fast creation workflows, and gorgeous feedback grids.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="rounded-2xl bg-teal-400 hover:bg-teal-500 text-gray-900 font-bold py-6 px-8 text-base shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 gap-2 cursor-pointer">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login" className="text-sm font-semibold hover:text-teal-300 transition-colors py-2.5">
                Already have an account? Sign In &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
