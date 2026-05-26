"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "border-b border-gray-100 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white shadow-md shadow-indigo-200/50 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 font-sans">
            Form<span className="text-indigo-600">Flow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            FAQ
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-100/50 cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center p-2 rounded-lg md:hidden text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              FAQ
            </Link>
            <hr className="border-gray-100 my-2" />
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl py-3 text-gray-700 hover:bg-gray-50 cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl bg-indigo-600 py-3 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
