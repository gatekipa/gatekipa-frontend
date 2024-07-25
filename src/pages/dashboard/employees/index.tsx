import { IEmployee, IEmployeeQuery } from '@/app/features/employee/thunk';
import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useEmployees from '@/hooks/employees';
import { formatDate } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

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
    accessorKey: 'mobileNo',
    header: 'Mobile Number',
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
      const visitor = row.original;
      return <div className='flex items-center gap-2'>{visitor.isActive}</div>;
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

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center p-3 mt-8'>
          <h2 className='text-2xl font-semibold'>Employee Management</h2>
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
            <Button className='text-xs' onClick={() => filterFn(query)}>
              Search
            </Button>
            <Button
              className='text-xs'
              onClick={() =>
                setQuery({ emailAddress: '', employeeNo: '', mobileNo: '' })
              }
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
      </div>
    </Card>
  );
};

export default EmployeesPage;
