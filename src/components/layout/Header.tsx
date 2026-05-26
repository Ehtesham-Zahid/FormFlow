"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-[#FCFAF7] font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo (Tally-style bold typographic logo) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-indigo-500 text-white shadow-[2px_2px_0px_0px_#000000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[0px_0px_0px_0px_#000000] transition-all duration-200">
            <Sparkles className="h-4 w-4" fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tight text-black font-sans">
            Form<span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_0px_#000000] ml-0.5">Flow</span>
          </span>
        </Link>

        {/* Navigation - clean links with bold hover borders */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black py-1 transition-all duration-150"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black py-1 transition-all duration-150"
          >
            Our Philosophy
          </Link>
          <Link
            href="#faq"
            className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black py-1 transition-all duration-150"
          >
            FAQ
          </Link>
        </nav>

        {/* Tally-Style Flat Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-bold text-black hover:text-indigo-600 transition-colors duration-150"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="rounded-xl border-2 border-black bg-indigo-500 px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#000000] transition-all duration-150 cursor-pointer">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center p-2 rounded-lg md:hidden border-2 border-black text-black bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_#000000]"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-[#FCFAF7] animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-black hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-black hover:text-indigo-600 transition-colors"
            >
              Our Philosophy
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold text-black hover:text-indigo-600 transition-colors"
            >
              FAQ
            </Link>
            <hr className="border-black my-2" />
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl border-2 border-black bg-white py-3 text-black font-bold hover:bg-gray-50 shadow-[3px_3px_0px_0px_#000000] cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl border-2 border-black bg-indigo-500 py-3 text-white font-bold hover:bg-indigo-600 shadow-[3px_3px_0px_0px_#000000] cursor-pointer">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
