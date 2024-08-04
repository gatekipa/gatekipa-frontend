import { IVisitorReport } from '@/app/features/employee/thunk';
import ColumnHeader from '@/components/shared/columnHeader';
import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useVisitorReports from '@/hooks/visitors/reports';
import { formatDate } from '@/utils';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useCallback } from 'react';
import { toast } from 'sonner';

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

  const onExportClickHandler = useCallback(() => {
    const headerRowKeys = {
      id: true,
      employeeEmailAddress: true,
      employeeFirstName: true,
      employeeLastName: true,
      employeeMobileNo: true,
      visitorEmailAddress: true,
      visitorFirstName: true,
      visitorLastName: true,
      visitorMobileNo: true,
      purposeOfVisit: true,
      visitDate: true,
      checkOutTime: true,
      checkInTime: true,
      createdAt: true,
    };

    const headerRow = Object.keys(headerRowKeys);

    // TODO: Add types to dataRows
    let dataRows = [];

    for (const record of visitorVisits) {
      dataRows.push({
        id: record.id,
        employeeEmailAddress: record.employee.emailAddress,
        employeeFirstName: record.employee.firstName,
        employeeLastName: record.employee.lastName,
        employeeMobileNo: record.employee.mobileNo,
        visitorEmailAddress: record.visitor.emailAddress,
        visitorFirstName: record.visitor.firstName,
        visitorLastName: record.visitor.lastName,
        visitorMobileNo: record.visitor.mobileNo,
        purposeOfVisit: record.purposeOfVisit,
        visitDate: record.visitDate,
        checkOutTime: record.checkoutTime,
        checkInTime: record.checkInTime,
        createdAt: record.createdAt,
      });
    }

    dataRows = dataRows.map((row) => Object.values(row));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headerRow.join(','), ...dataRows.map((row) => row.join(','))].join('\n');

    const encodedURI = encodeURI(csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', encodedURI);
    link.setAttribute('download', `${new Date().toISOString()}.csv`);
    document.body.appendChild(link);

    link.click();

    toast.success(`Exported Successfully`);
  }, [visitorVisits]);

  const exportToPdf = useCallback(() => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text('Visitors Report', 14, 22);

    const data = visitorVisits.map((employee) => {
      const record = {
        email: employee.employee.emailAddress,
        name: `${employee.employee.firstName} ${employee.employee.lastName}`,
      };
      return Object.values(record);
    });

    autoTable(doc, {
      head: [['email', 'name', 'employeeNo']],
      body: data,
    });

    doc.save(`visitors-${new Date().toISOString()}.pdf`);
  }, [visitorVisits]);

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
