import { fetchVisitsThunk, IVisit } from '@/app/features/company/thunk';
import { fetchEmployeesThunk } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ConfirmModal, {
  ModalType,
} from '@/components/features/visits/confirmModal';
import VisitsToolbar from '@/components/features/visits/toolbar';
import ColumnHeader from '@/components/shared/columnHeader';
import PaginatedTable from '@/components/shared/paginatedTable';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const columns: ColumnDef<IVisit>[] = [
  {
    accessorKey: 'purposeOfVisit',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Purpose of Visit' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Person to Meet' />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.employee;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: 'employee.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Person to Meet's Email" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee.mobileNo',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Person to Meet's Mobile" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'visitDate',
    header: ({ column }) => <ColumnHeader column={column} label='Visit Date' />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt ? (
        <span>{formatDate(new Date(createdAt))}</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check In Time' />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt ? (
        <span>{formatDate(new Date(createdAt))}</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: 'checkoutTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check Out Time' />
    ),
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt ? (
        <span>{formatDate(new Date(createdAt))}</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const visit = row.original;
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

      const visitCheckInDate = new Date(visit.checkInTime);
      visitCheckInDate.setHours(0, 0, 0, 0);
      return (
        <div className='flex items-center gap-2'>
          {!visit.checkInTime && (
            /*visitCheckInDate >= currentDate &&*/ <ConfirmModal
              label='Check In'
              type={ModalType.CHECK_IN}
              visit={visit}
            />
          )}
          {!visit.checkoutTime && (
            <ConfirmModal
              label='Check Out'
              type={ModalType.CHECK_OUT}
              visit={visit}
            />
          )}
        </div>
      );
    },
  },
];

const VisitsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { visitorId } = useParams<{ visitorId: string }>();

  const { visits } = useAppSelector((state) => state.company);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!visitorId && !user?.id) return;

    dispatch(
      fetchVisitsThunk({
        visitorId: visitorId !== ':visitorId' ? visitorId! : user?.visitorId!,
      })
    );

    dispatch(fetchEmployeesThunk({}));
  }, [user, visitorId]);

  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between mt-6'>
          <h1 className='flex items-center gap-x-3 text-2xl font-semibold'>
            {user?.userType !== 'VISITOR' && (
              <Link to='/dashboard/visitors'>
                <ArrowLeft size={16} />
              </Link>
            )}
            Visits Page
          </h1>
          <div>
            <VisitsToolbar visitorId={visitorId!} mode='toolbar' />
          </div>
        </div>
        <div>
          <PaginatedTable data={visits} columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitsPage;
