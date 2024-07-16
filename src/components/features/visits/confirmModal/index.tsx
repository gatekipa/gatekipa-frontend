import { IVisit } from "@/app/features/company/thunk";
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
import React from "react";

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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
