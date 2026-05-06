"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  OnboardingForm,
  OnboardingFormValues,
} from "@/components/forms/auth/OnboardingForm";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";

export default function OnboardingPage() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (data: OnboardingFormValues) => {
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>

          <h2 className="text-xl font-bold mb-2">Integration Configured</h2>

          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <OnboardingHeader />
      <div className="max-w-2xl mx-auto px-6 mt-10 pb-20">
        <OnboardingForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
