import { IEmployee, IEmployeeVisit } from '@/app/features/employee/thunk';
import { useAppSelector } from '@/app/hooks';
import ColumnHeader from '@/components/shared/columnHeader';
import PaginatedTable from '@/components/shared/paginatedTable';
import { Card, CardContent } from '@/components/ui/card';
import useEmployeeVisits from '@/hooks/employees/visits';
import { formatDate, formatTime } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft } from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const columns: ColumnDef<IEmployeeVisit>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeader column={column} label='Date' />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return <span>{formatDate(new Date(createdAt))}</span>;
    },
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => <ColumnHeader column={column} label='Time In' />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const checkInTime = getValue() as Date;
      return <span>{formatTime(new Date(checkInTime))}</span>;
    },
  },
  {
    accessorKey: 'checkOutTime',
    header: ({ column }) => <ColumnHeader column={column} label='Time Out' />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const checkOutTime = getValue() as Date;
      return <span>{formatTime(new Date(checkOutTime))}</span>;
    },
  },
];

const EmployeeVisitsPage: React.FC = () => {
  const navigate = useNavigate();

  const { employeeId } = useParams();

  const { employees } = useAppSelector((state) => state.employee);

  const employee = useMemo(() => {
    return (
      employees.find((employee) => employee.id === employeeId) ??
      ({} as IEmployee)
    );
  }, [employeeId, employees]);

  const { visits } = useEmployeeVisits(employeeId!);

  return (
    <Card>
      <CardContent>
        <div className='flex items-center gap-x-2 mt-8'>
          <ArrowLeft
            strokeWidth={2}
            onClick={() => navigate(`/dashboard/employees`)}
            className='cursor-pointer'
          />
          <h2 className='text-2xl font-semibold'>Employee Visits</h2>
        </div>
      </CardContent>
      <div className='flex justify-between mx-5 md:mx-10'>
        <div className='space-y-3'>
          <div className='flex gap-x-8 items-center'>
            <div className='space-y-1'>
              <div className='text-xs'>Name</div>
              <div className='text-sm font-semibold'>
                {employee?.firstName} {employee?.lastName}
              </div>
            </div>

            <div className='space-y-1'>
              <div className='text-xs'>Employee No</div>
              <div className='text-sm font-semibold'>
                {employee?.employeeNo}
              </div>
            </div>

            <div className='space-y-1'>
              <div className='text-xs'>Email Address</div>
              <div className='text-sm font-semibold'>
                {employee?.emailAddress}
              </div>
            </div>

            <div className='space-y-1'>
              <div className='text-xs'>Mobile No</div>
              <div className='text-sm font-semibold'>{employee?.mobileNo}</div>
            </div>
          </div>
          <div className='flex gap-x-8 items-center'>
            <div className='space-y-1'>
              <div className='text-xs'>Designation</div>
              <div className='text-sm font-semibold'>
                {employee?.designation}
              </div>
            </div>

            <div className='space-y-1'>
              <div className='text-xs'>Shift</div>
              <div className='text-sm font-semibold'>
                {employee?.shift?.name}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Get Image Here */}
          <img
            src='https://img.freepik.com/free-photo/portrait-young-business-man-posing-with-crossed-arms_23-2149206527.jpg'
            alt='Employee'
            className='w-36 h-36 rounded-sm object-cover'
          />
        </div>
      </div>
      <div className='mx-8 mb-8'>
        <PaginatedTable data={visits} columns={columns} />
      </div>
    </Card>
  );
};

export default EmployeeVisitsPage;
