import { deleteShiftThunk } from "@/app/features/employee/thunk";
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

const DeleteShiftModal: React.FC<{
  open: boolean;
  onClose: () => void;
  id: string;
}> = ({ open, onClose, id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(deleteShiftThunk({ id })).unwrap();
      toast.success(`Shift Successfully Deleted`);
      onClose();
    } catch (error) {
      toast.error(error as string);
    }
  }, [id]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Shift</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this shift.?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs px-3">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs px-3" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShiftModal;
