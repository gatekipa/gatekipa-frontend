import {
  IVisit,
  markVisitCheckoutThunk,
  markVisitThunk,
} from "@/app/features/company/thunk";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { toast } from "sonner";

export enum ModalType {
  CHECK_IN = "check-in",
  CHECK_OUT = "check-out",
}

type ConfirmModalProps = {
  label: string;
  type: ModalType;
  visit: IVisit;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ label, type, visit }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      if (type === ModalType.CHECK_IN)
        await dispatch(markVisitThunk({ visitId: visit.id })).unwrap();
      else {
        await dispatch(markVisitCheckoutThunk({ visitId: visit.id })).unwrap();
      }
      toast.success("Visit marked successfully");
    } catch (error) {
      toast.error(error as string);
    }
  }, [type, visit]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" className="text-xs">
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will mark the check action that
            you have performed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
