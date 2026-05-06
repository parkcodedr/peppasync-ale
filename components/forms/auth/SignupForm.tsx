"use client";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/InputField";
import { PasswordField } from "@/components/ui/PasswordField";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAuth";
import { setAuthToken, setRefreshToken } from "@/lib/utils";
import { getErrorMessage } from "@/lib/error";
import Spinner from "@/components/shared/Spinner";

const schema = z
  .object({
    full_name: z
      .string()
      .min(1, "Full name is required")
      .refine(
        (val) => val.trim().split(/\s+/).length >= 2,
        "Please enter your first and last name",
      ),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignUpForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await registerMutation.mutateAsync(data);
      setAuthToken(res.tokens?.access_token);
      setRefreshToken(res?.tokens?.refresh_token);
      router.push("/onboarding");
    } catch (err: unknown) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-black">
            Sign up
          </h1>
          <p className="text-sm lg:text-lg text-[#2A2A2E] font-medium mb-6">
            Provide your details to get started.
          </p>
        </div>
        {registerMutation.isError && (
          <p className="text-sm text-red-500  mt-2">
            {getErrorMessage(registerMutation.error)}
          </p>
        )}

        <InputField name="full_name" label="Full Name" placeholder="Fullname" />
        <InputField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Email"
        />
        <PasswordField
          name="password"
          label="Password"
          placeholder="Password"
        />
        <PasswordField
          name="password_confirmation"
          label="Confirm Password"
          placeholder="Confirm password"
        />

        <Button className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? <Spinner color="black" /> : "Sign up"}
        </Button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-semibold text-black">
            Log in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
