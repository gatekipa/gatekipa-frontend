import { employeeCheckOutThunk } from '@/app/features/employee/thunk';
import { useAppDispatch } from '@/app/hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React, { useCallback } from 'react';
import { toast } from 'sonner';

type EmployeeCheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
};
const EmployeeCheckoutModal: React.FC<EmployeeCheckoutModalProps> = ({
  isOpen,
  onClose,
  employeeId,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(
        employeeCheckOutThunk({ employeeId: employeeId })
      ).unwrap();
      toast.success(`Employee Successfully Checked Out`);
      onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, [employeeId]);

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
          <AlertDialogCancel className='text-xs px-3'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='text-xs px-3' onClick={handleSubmit}>
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmployeeCheckoutModal;
