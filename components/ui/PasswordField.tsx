"use client";

import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
}

export const PasswordField = ({
  name,
  label,
  helperText,
  className,
  ...rest
}: Props) => {
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={show ? "text" : "password"}
          {...register(name)}
          {...rest}
          className={cn(
            "w-full h-11 rounded-md border px-3 pr-10 text-sm",
            "bg-white text-gray-900 placeholder:text-gray-400",
            "transition-all duration-200",
            "focus:outline-none  focus:border-indigo-600",
            "disabled:bg-gray-100 disabled:text-gray-500",
            error ? "border-red-500  focus:border-red-500" : "border-gray-300",
            className,
          )}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
