import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/src/lib/utils";
import QueryProvider from "@/src/providers/query-provider";
import { AppSidebar } from "@/src/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Flow",
  description: "Build modern forms with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <QueryProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  fontSize: "14px",
                },
              }}
            />
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>
                <main className="p-4 sm:p-6">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
