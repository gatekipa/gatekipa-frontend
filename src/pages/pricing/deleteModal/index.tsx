import { IPlan } from "@/app/features/pricing/thunk";
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
import React from "react";

type DeletePricingModalProps = {
  plan: IPlan;
  open: boolean;
  onClose: () => void;
};
const DeletePricingModal: React.FC<DeletePricingModalProps> = ({
  onClose,
  open,
  plan,
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Pricing Plan</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete pricing plan {plan.planName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs px-3">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs px-3" onClick={onClose}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePricingModal;
