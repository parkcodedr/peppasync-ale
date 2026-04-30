"use client";

import { TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export const TextAreaField = ({
  name,
  label,
  className,
  ...rest
}: TextAreaFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-600 mb-2"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        {...register(name)}
        {...rest}
        className={cn(
          "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none resize-none transition",
          "focus:border-indigo-500 ",
          error && "border-red-500 ",
          className,
        )}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};
