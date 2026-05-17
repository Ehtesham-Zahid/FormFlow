import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default async function SuccessPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center space-y-6">
                <div className="flex justify-center">
                    <div className="bg-green-50 p-4 rounded-full">
                        <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={2} />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Response recorded
                    </h1>
                    <p className="text-sm text-gray-500">
                        Thank you for your submission. Your response has been securely saved.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/">
                        <Button className="w-full font-semibold tracking-wide">
                            CREATE YOUR OWN FORM
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
