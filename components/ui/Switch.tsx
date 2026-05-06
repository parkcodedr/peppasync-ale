"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled,
}: CustomSwitchProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center gap-4 w-full select-none",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
          checked ? "bg-indigo-600" : "bg-gray-300",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </div>
      {label && (
        <span className="text-sm text-[#7A7A85] font-medium">{label}</span>
      )}
    </label>
  );
}
