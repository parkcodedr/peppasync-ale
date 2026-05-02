"use client";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/InputField";
import { PasswordField } from "@/components/ui/PasswordField";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { setAuthToken, setRefreshToken } from "@/lib/utils";
import { getErrorMessage } from "@/lib/error";
import Spinner from "@/components/shared/Spinner";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function SigninForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await loginMutation.mutateAsync(data);
      setAuthToken(res.access_token);
      setRefreshToken(res?.refresh_token);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      console.log("Login failed:", errorMessage);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <h1 className="text-2xl lg:text-4xl font-extrabold text-black">
          Login
        </h1>
        <p className="text-sm lg:text-lg text-gray-500 mb-6">
          Provide your details to get login.
        </p>

        {loginMutation.isError && (
          <p className="text-base text-red-500 mt-2">
            {getErrorMessage(loginMutation.error)}
          </p>
        )}

        <InputField name="email" label="Email Address" type="email" />
        <PasswordField name="password" label="Password" />

        <div className="flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-lg text-ancient font-bold"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? <Spinner color="white" /> : "Login"}
        </Button>

        <p className="text-lg text-gray-600 text-center lg:text-left">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-ancient font-bold text-lg">
            Sign up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
