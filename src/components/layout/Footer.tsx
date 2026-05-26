"use client";

import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

export default function Footer() {  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-gray-50/50 py-16 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          
          {/* Logo & Pitch */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Form<span className="text-indigo-600">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Create beautiful, Notion-style forms without the clutter. Designed for builders who appreciate clean aesthetics and fast keyboard navigation.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Create Form
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#faq" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:support@formflow.com"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-400">
              Made with ❤️ for developers and creators.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">&copy; {currentYear} FormFlow Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
