import { IEmployee, IEmployeeQuery } from '@/app/features/employee/thunk';
import CreateEmployeeModal from '@/components/features/employees/createEmployeeModal';
import EmployeeStatusModal from '@/components/features/employees/employeeStatusModal';
import PaginatedTable from '@/components/shared/paginatedTable';
import ToolTip from '@/components/shared/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useEmployees from '@/hooks/employees';
import useShifts from '@/hooks/shifts';
import { formatDate } from '@/utils';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Check, CircleOff, Clock11, UsersRound } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const columns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
  },
  {
    accessorKey: 'employeeNo',
    header: 'Employee No',
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const { isActive } = row.original;
      return (
        <Badge
          className={
            isActive
              ? 'bg-green-500 hover:bg-green-800'
              : 'bg-red-600 hover:bg-red-800'
          }
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'mobileNo',
    header: 'Mobile Number',
  },
  {
    accessorKey: 'shift.name',
    header: 'Shift',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return <span>{formatDate(new Date(createdAt))}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const employee = row.original;
      // TODO: Refactor Modal State with Redux

      const [isOpen, setIsOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);

      return (
        <div className='flex items-center gap-2'>
          <ToolTip title='Edit Employee'>
            <Pencil2Icon
              className='text-gray-500 cursor-pointer hover:text-gray-900'
              onClick={() => setIsOpen(true)}
            />
          </ToolTip>
          <ToolTip title='Visits of Employee'>
            <Clock11
              className='text-gray-500 cursor-pointer hover:text-gray-900'
              size={15}
            />
          </ToolTip>
          <ToolTip
            title={employee?.isActive ? 'Mark as Inactive' : 'Mark as Active'}
          >
            {employee?.isActive ? (
              <CircleOff
                className='text-red-500 cursor-pointer hover:text-red-700'
                size={15}
                onClick={() => setIsEditModalOpen(true)}
              />
            ) : (
              <Check
                className='text-green-500 cursor-pointer hover:text-green-600'
                size={15}
                strokeWidth={3}
                onClick={() => setIsEditModalOpen(true)}
              />
            )}
          </ToolTip>
          {isOpen && (
            <CreateEmployeeModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              employee={employee}
            />
          )}
          {isEditModalOpen && (
            <EmployeeStatusModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          )}
        </div>
      );
    },
  },
];

const EmployeesPage: React.FC = () => {
  const [query, setQuery] = React.useState<IEmployeeQuery>({
    employeeNo: '',
    mobileNo: '',
    emailAddress: '',
  });

  const { employees, loading, filterFn } = useEmployees();
  useShifts();

  const [isOpen, setIsOpen] = useState(false);

  const disableCondition = useMemo(
    () =>
      loading ||
      (query.employeeNo === '' &&
        query.emailAddress === '' &&
        query.mobileNo === ''),
    [loading, query]
  );

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mt-8'>
          <h2 className='text-2xl font-semibold'>Employee Management</h2>
          <Button
            className='text-xs'
            title='Create New Employee'
            onClick={() => setIsOpen(true)}
          >
            <UsersRound size={16} className='mr-2' />
            New Employee
          </Button>
        </div>
      </CardContent>
      <div>
        <div className='flex flex-col gap-x-3 my-4 mx-6 space-y-6 md:flex-row md:space-y-0'>
          <Input
            placeholder='Search By Employee No'
            className='placeholder:text-xs'
            value={query.employeeNo}
            onChange={(e) => setQuery({ ...query, employeeNo: e.target.value })}
          />
          <Input
            placeholder='Search By Email Address'
            className='placeholder:text-xs'
            value={query.emailAddress}
            onChange={(e) =>
              setQuery({ ...query, emailAddress: e.target.value })
            }
          />
          <Input
            placeholder='Search By Mobile No'
            className='placeholder:text-xs'
            value={query.mobileNo}
            onChange={(e) => setQuery({ ...query, mobileNo: e.target.value })}
          />
          <div className='flex gap-x-2'>
            <Button
              className='text-xs'
              onClick={() => filterFn(query)}
              disabled={disableCondition}
            >
              Search
            </Button>
            <Button
              className='text-xs'
              onClick={() =>
                setQuery({ emailAddress: '', employeeNo: '', mobileNo: '' })
              }
              disabled={disableCondition}
            >
              Reset
            </Button>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='mx-6 mb-8'>
            <PaginatedTable data={employees} columns={columns} />
          </div>
        )}
        {isOpen && (
          <CreateEmployeeModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </Card>
  );
};

export default EmployeesPage;
