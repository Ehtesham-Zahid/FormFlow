import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <Link
          href="/"
          className="flex items-center text-3xl font-black tracking-tight select-none mb-8"
        >
          <span className="text-primary">FORM</span>
          <span className="text-foreground">FLOW</span>
        </Link>

        <SignIn
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card: "shadow-sm border border-gray-100 rounded-2xl w-full",
              headerTitle: "text-gray-900 text-xl font-bold tracking-tight",
              headerSubtitle: "text-gray-500 text-sm",
              socialButtonsBlockButton:
                "border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors shadow-sm",
              socialButtonsBlockButtonText: "font-medium text-sm",
              formButtonPrimary:
                "bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg normal-case shadow-sm transition-colors",
              formFieldInput:
                "rounded-lg border-gray-200 focus:ring-gray-900 focus:border-gray-900 text-sm py-2 shadow-sm",
              formFieldLabel: "text-gray-700 font-medium text-sm",
              footerActionLink: "text-gray-900 hover:text-gray-700 font-medium",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 text-xs",
              formFieldWarningText: "text-red-500 text-xs",
              formFieldErrorText: "text-red-500 text-xs",
              identityPreviewEditButtonIcon: "text-gray-500 hover:text-gray-900",
              footer: "hidden",
            },
            variables: {
              colorPrimary: "#111827",
              colorBackground: "#ffffff",
              colorText: "#1f2937",
              colorTextSecondary: "#6b7280",
              borderRadius: "0.5rem",
              fontFamily: "inherit",
            },
          }}
        />
      </div>
    </div>
  );
}
