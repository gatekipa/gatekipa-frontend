import {
  changeCompanyUserStatusThunk,
  ICompanyUser,
} from "@/app/features/company/thunk";
import { useAppDispatch } from "@/app/hooks";
import LoadingButton from "@/components/shared/loadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { useCallback } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  companyUser: ICompanyUser;
};

const ChangeCompanyUserStatusModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, companyUser } = props;

  const dispatch = useAppDispatch();

  const onSubmitHandler = useCallback(async () => {
    try {
      await dispatch(
        changeCompanyUserStatusThunk({
          companyUserId: companyUser.id,
          isActive: !companyUser.isActive,
        })
      ).unwrap();
      toast.success(`User status changed successfully`);
      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  }, [companyUser]);

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
          <DialogDescription>
            Are you sure you want to mark{" "}
            <strong>
              {companyUser.firstName} {companyUser.lastName}
            </strong>{" "}
            as <strong>{companyUser.isActive ? "Inactive" : "Active"}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end items-center gap-x-3">
          <Button onClick={() => onClose()} variant="outline">
            Cancel
          </Button>
          <LoadingButton
            loading={false}
            label="Submit"
            onClick={onSubmitHandler}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCompanyUserStatusModal;
