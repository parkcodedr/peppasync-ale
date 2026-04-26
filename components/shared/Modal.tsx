import { ChevronLeft, X } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const SIZE_MAP = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  showCloseButton = true,
  size = "xl",
  className,
  showBackButton,
  onBack,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 min-h-screen">
      <div
        className={clsx(
          "bg-white rounded-lg p-6 w-full mx-4 shadow-xl",
          SIZE_MAP[size],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              {showBackButton ? (
                <button
                  onClick={onBack}
                  className="h-[48px] w-[48px] rounded-xl border-2 border-[#2A2A2E] flex justify-center items-center cursor-pointer"
                >
                  <ChevronLeft />
                </button>
              ) : null}
              <div>
                {title && (
                  <h2 className="text-xl font-bold text-[#2A2A2E] ">{title}</h2>
                )}
                {description ? (
                  <p className="text-[#7A7A85] text-base">{description}</p>
                ) : null}
              </div>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 text-2xl cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="text-gray-600 dark:text-gray-300 mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
