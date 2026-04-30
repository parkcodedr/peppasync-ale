import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (reason: string) => void;
  pendingAction: string | null;
}

export const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  pendingAction,
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "" },
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: FormData) => {
    onContinue(data.reason);
    reset();
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      showCloseButton={false}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-4 px-5 lg:px-5 py-5 text-center">
            <h1 className="text-black dark:text-gray-300 font-semibold text-lg">
              Reason for {pendingAction}
            </h1>

            <TextAreaField
              name="reason"
              rows={8}
              placeholder="Enter reason..."
              className="w-full resize-none min-h-25 lg:min-h-50"
            />

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 cursor-pointer rounded-full lg:px-10 uppercase"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 cursor-pointer uppercase rounded-full lg:px-10"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default RejectReasonModal;
