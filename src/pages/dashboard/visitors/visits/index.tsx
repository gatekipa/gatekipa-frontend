import { IVisitorReport } from '@/app/features/employee/thunk';
import ColumnHeader from '@/components/shared/columnHeader';
import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useVisitorReports from '@/hooks/visitors/reports';
import { formatDate } from '@/utils';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

export const columns: ColumnDef<IVisitorReport>[] = [
  {
    accessorKey: 'employee',
    header: ({ column }) => (
      <ColumnHeader column={column} label={`Employee's Full Name`} />
    ),
    cell: ({ row }) =>
      `${row.original.employee.firstName} ${row.original.employee.lastName}`,
    enableSorting: true,
  },
  {
    accessorKey: 'employee.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label={`Employee's Email`} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'visitor',
    header: ({ column }) => (
      <ColumnHeader column={column} label={`Visitor's Full Name`} />
    ),
    cell: ({ row }) =>
      `${row.original.visitor.firstName} ${row.original.visitor.lastName}`,
    enableSorting: true,
  },
  {
    accessorKey: 'visitor.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label={`Visitor's Email`} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'purposeOfVisit',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Purpose of Visit' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'visitDate',
    header: ({ column }) => <ColumnHeader column={column} label='Visit Date' />,
    cell: ({ row }) => formatDate(new Date(row.original.visitDate)),
    enableSorting: true,
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check In Time' />
    ),
    cell: ({ row }) => formatDate(new Date(row.original.checkInTime)),

    enableSorting: true,
  },
  {
    accessorKey: 'checkOutTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check Out Time' />
    ),
    cell: ({ row }) => formatDate(new Date(row.original.checkoutTime)),

    enableSorting: true,
  },
];

const AllVisitorVisitsPage: React.FC = () => {
  const { visitorVisits, loading } = useVisitorReports();

  const onExportClickHandler = () => {
    console.log('Export to CSV');
  };

  const exportToPdf = () => {
    console.log('Export to PDF');
  };

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mt-8'>
          <h2 className='text-2xl font-semibold'>Visitor Reports</h2>
          <div className='flex gap-x-2 flex-wrap md:flex-nowrap'>
            <Button
              className='text-xs'
              title='Export to CSV'
              onClick={onExportClickHandler}
              disabled={loading || !visitorVisits.length}
            >
              <DownloadIcon className='mr-2' />
              Export to CSV
            </Button>
            <Button
              className='text-xs'
              title='Export to PDF'
              onClick={exportToPdf}
              disabled={loading || !visitorVisits.length}
            >
              <DownloadIcon className='mr-2' />
              Export to PDF
            </Button>
          </div>
        </div>
      </CardContent>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='mx-6 mb-8'>
            <PaginatedTable data={visitorVisits} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllVisitorVisitsPage;
