

import { OnboardingForm } from "@/components/forms/auth/OnboardingForm";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";

export default function OnboardingPage() {
  return (
    <main>
      <OnboardingHeader />
      <div className="max-w-2xl mx-auto px-6 mt-10 pt-12 pb-20">
        <OnboardingForm />
      </div>
    </main>
  );
}
