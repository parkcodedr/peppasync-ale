import { AlertCircle } from "lucide-react";
import React from "react";

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

 export function ErrorMessage({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 bg-red-50 border border-red-200 rounded-md">
      <AlertCircle className="w-6 h-6 text-red-500" />
      <p className="text-sm font-medium text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-1 text-sm rounded-md bg-red-100 hover:bg-red-200 text-red-700 transition cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
