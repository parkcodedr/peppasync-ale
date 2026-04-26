"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  helperText?: string;
}

export const InputField = ({
  name,
  label,
  helperText,
  className,
  ...rest
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full space-y-1.5">
   
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={name}
        {...register(name)}
        {...rest}
        className={cn(
          "w-full h-11 rounded-md border px-3 text-sm",
          "bg-white text-gray-900 placeholder:text-gray-400",
          "transition-all duration-200",
          "focus:outline-none  focus:border-indigo-600",
          "disabled:bg-gray-100 disabled:text-gray-500",
          error
            ? "border-red-500  focus:border-red-500"
            : "border-gray-300",
          className
        )}
      />

      {/* Helper or Error */}
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};