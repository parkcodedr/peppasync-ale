"use client";

import Modal from "@/components/shared/Modal";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextAreaField } from "../ui/TextAreaField";
import { Button } from "../ui/Button";

export const orderApproveSchema = z.object({
  notes: z.string().min(3, "Notes must be at least 3 characters"),
});
type FormData = z.infer<typeof orderApproveSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: FormData) => void;
}

export default function ApproveNotesModal({
  isOpen,
  onClose,
  onContinue,
}: Props) {
  const methods = useForm<FormData>({
    resolver: zodResolver(orderApproveSchema),
    defaultValues: {
      notes: "",
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" showCloseButton={false}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onContinue)}
          className="flex flex-col gap-4 px-5 py-6 text-center"
        >
          <h1 className="text-gray-700 font-semibold text-lg">
            Approval Notes
          </h1>

          <TextAreaField
            name="notes"
            label=""
            placeholder="Add approval notes..."
            rows={6}
          />

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full uppercase"
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded-full uppercase">
              Continue
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
