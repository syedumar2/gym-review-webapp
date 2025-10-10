"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-primary px-6 py-12">
      {/* Error Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 rounded-full p-3">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-black-dark mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-6">
          We’re sorry, but an unexpected error occurred. Please try again later.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.refresh()}
            className="bg-secondary hover:bg-secondary-dark text-white w-full sm:w-auto"
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="bg-secondary hover:bg-secondary-dark text-white w-full sm:w-auto"
          >
            Back to Login
          </Button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-black">
        Need help?{" "}
        <a
          href="/contact"
          className="font-semibold text-black-dark hover:text-black"
        >
          Contact support
        </a>
      </p>
    </div>
  );
}
