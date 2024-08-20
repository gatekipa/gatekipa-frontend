import { ICompanyUser } from "@/app/features/company/thunk";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  companyUser: ICompanyUser;
};

const ChangeCompanyUserStatusModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, companyUser } = props;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Mark {companyUser.isActive ? "Inactive" : "Active"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Are you sure you want to mark{" "}
            <strong>
              {companyUser.firstName} {companyUser.lastName}
            </strong>{" "}
            as <strong>{companyUser.isActive ? "Inactive" : "Active"}</strong>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCompanyUserStatusModal;
