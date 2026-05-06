"use client";

import { SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Option[];
  helperText?: string;
  placeholder?: string;
}

export const SelectField = ({
  name,
  label,
  options,
  helperText,
  className,
  placeholder,
  ...rest
}: SelectFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="w-full space-y-1.5 ">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative cursor-pointer">
        <select
          id={name}
          {...register(name)}
          {...rest}
          className={cn(
            "w-full h-11 rounded-md border px-3 text-sm appearance-none cursor-pointer",
            "bg-white text-gray-900",
            "transition-all duration-200",
            "focus:outline-none focus:border-indigo-600",
            "disabled:bg-gray-100 disabled:text-gray-500",

            error ? "border-red-500 focus:border-red-500" : "border-gray-300",

            className,
          )}
        >
          <option value="" disabled hidden>
            {placeholder || "Select option"}
          </option>

          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="cursor-pointer"
            >
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
