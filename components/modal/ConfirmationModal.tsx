"use client";

import Modal from "@/components/shared/Modal";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/Button";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  confirmVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";
  isloading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon,
  confirmVariant = "destructive",
  isloading,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center space-y-4 py-3 px-3">
        {icon && <div>{icon}</div>}

        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {description && (
          <p className="text-sm text-gray-500 max-w-sm">{description}</p>
        )}
      </div>

      <div className="flex justify-center gap-3 lg:gap-6 pb-5">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="lg:px-10"
        >
          {cancelText}
        </Button>

        <Button
          type="button"
          disabled={isloading}
          variant={confirmVariant}
          onClick={onConfirm}
          className="lg:px-10"
        >
          {isloading ? (
            <span className="px-6">
              <Spinner />
            </span>
          ) : (
            confirmText
          )}
        </Button>
      </div>
    </Modal>
  );
}
