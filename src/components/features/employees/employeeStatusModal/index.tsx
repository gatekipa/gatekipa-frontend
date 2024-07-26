import {
  changeEmployeeStatusThunk,
  IEmployee,
} from '@/app/features/employee/thunk';
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

type EmployeeStatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: IEmployee;
};
const EmployeeStatusModal: React.FC<EmployeeStatusModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(
        changeEmployeeStatusThunk({ ...employee, isActive: !employee.isActive })
      ).unwrap();
      toast.success(
        `Employee Successfully Marked as ${
          employee.isActive ? 'Inactive' : 'Active'
        }`
      );
      onClose();
    } catch (error) {
      toast.error(`${error}`);
    }
  }, [employee]);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to mark this user as{' '}
            {!employee?.isActive ? 'Active' : 'Inactive'}?
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

export default EmployeeStatusModal;
