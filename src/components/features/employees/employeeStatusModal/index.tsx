import { IEmployee } from '@/app/features/employee/thunk';
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
import React from 'react';

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
          <AlertDialogAction className='text-xs px-3'>
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmployeeStatusModal;
