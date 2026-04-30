"use client";

import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorPage = ({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorPageProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="px-4 py-">
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
