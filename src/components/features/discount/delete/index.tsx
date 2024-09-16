import { deleteDiscount } from "@/app/features/pricing/thunk";
import { useAppDispatch } from "@/app/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useCallback } from "react";
import { toast } from "sonner";

type DeleteDiscountModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

const DeleteDiscountModal: React.FC<DeleteDiscountModalProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(deleteDiscount({ id })).unwrap();
      toast.success(`Discount Successfully Deleted`);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are checking out for today's work.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to check out.?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs px-3">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs px-3" onClick={handleSubmit}>
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDiscountModal;
