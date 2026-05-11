import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Link from "next/link";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        {/* LOGO */}
        <div className="mb-6 text-3xl font-bold tracking-tight">
          <span className="text-primary">FORM</span>
          <span>FLOW</span>
        </div>

        {/* HEADLINE */}
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Create beautiful forms without the clutter.
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Build forms, collect responses, and manage submissions in a clean
          modern workspace inspired by tools people actually enjoy using.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Sign In
          </Link>
        </div>

        {/* PREVIEW CARD */}
        <div className="mt-20 w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="rounded-2xl border border-border bg-background p-6 text-left">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Customer Feedback Form
                </h2>

                <p className="text-sm text-muted-foreground">
                  Collect responses and analyze insights.
                </p>
              </div>

              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Active
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">
                  What do you think about our product?
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">
                  Would you recommend us to others?
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">Additional comments</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
