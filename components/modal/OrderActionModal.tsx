"use client";

import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { TriggerConfig } from "@/lib/orderTriggers";
import { FormProvider, useForm } from "react-hook-form";

interface FormValues {
  notes?: string;
  reason?: string;
  finance_ref?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: TriggerConfig | null;
  onContinue: (data: FormValues) => void;
}

export default function OrderActionModal({
  isOpen,
  onClose,
  config,
  onContinue,
}: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {
      notes: "",
      reason: "",
      finance_ref: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!config) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      showCloseButton={false}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onContinue)}
          className="flex flex-col gap-3 px-3 py-2"
        >
          <h2 className="text-lg font-semibold text-black text-center">{config.label}</h2>

          {config.requiresNotes && (
            <TextAreaField
              name="notes"
              label="Notes"
              rows={6}
              placeholder="Enter notes..."
            />
          )}

          {config.requiresReason && (
            <TextAreaField
              name="reason"
              label="Reason"
              rows={6}
              placeholder="Enter reason..."
            />
          )}

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-full lg:px-10"
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded-full lg:px-10">
              Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
