import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DownloadIcon } from '@radix-ui/react-icons';
import React, { useCallback } from 'react';
import { toast } from 'sonner';

import { IEmployeeReport } from '@/app/features/employee/thunk';
import ColumnHeader from '@/components/shared/columnHeader';
import useAllEmployeeVisits from '@/hooks/employees/allVisits';
import { ColumnDef } from '@tanstack/react-table';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const columns: ColumnDef<IEmployeeReport>[] = [
  {
    accessorKey: 'employee.firstName',
    header: ({ column }) => <ColumnHeader column={column} label='First Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'employee.lastName',
    header: ({ column }) => <ColumnHeader column={column} label='Last Name' />,
    enableSorting: true,
  },
  {
    accessorKey: 'employee.designation',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Designation' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee.employeeNo',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Employee No' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee.emailAddress',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Email Address' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'employee.mobileNo',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Mobile Number' />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <ColumnHeader column={column} label='Check In Time' />
    ),
    enableSorting: true,
  },
];

const AllVisitsEmployeePage: React.FC = () => {
  const { employeeVisits, loading } = useAllEmployeeVisits();

  const onExportClickHandler = useCallback(() => {
    const headerRowKeys = {
      email: true,
      firstName: true,
      lastName: true,
      employeeNo: true,
      designation: true,
      mobileNo: true,
      dateOfBirth: true,
      checkInTime: true,
    };
    const headerRow = Object.keys(headerRowKeys);

    // TODO: Add types to dataRows
    let dataRows = [];

    for (const record of employeeVisits) {
      dataRows.push({
        email: record.employee.emailAddress,
        firstName: record.employee.firstName,
        lastName: record.employee.lastName,
        desgination: record.employee.designation,
        employeeNo: record.employee.employeeNo,
        mobileNo: record.employee.mobileNo,
        dateOfBirth: record.employee.dateOfBirth,
        checkInTime: record.checkInTime,
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
  }, [employeeVisits]);

  const exportToPdf = useCallback(() => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text('Employee Reports', 14, 22);

    const data = employeeVisits.map((employee) => {
      const record = {
        email: employee.employee.emailAddress,
        name: `${employee.employee.firstName} ${employee.employee.lastName}`,
        employeeNo: employee.employee.employeeNo,
      };
      return Object.values(record);
    });

    autoTable(doc, {
      head: [['Email', 'Name', 'Employee No']],
      body: data,
    });

    doc.save(`employees-${new Date().toISOString()}.pdf`);
  }, [employeeVisits]);

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mt-8'>
          <h2 className='text-2xl font-semibold'>Employee Reports</h2>
          <div className='flex gap-x-2 flex-wrap md:flex-nowrap'>
            <Button
              className='text-xs'
              title='Export to CSV'
              onClick={onExportClickHandler}
              disabled={loading || !employeeVisits.length}
            >
              <DownloadIcon className='mr-2' />
              Export to CSV
            </Button>
            <Button
              className='text-xs'
              title='Export to PDF'
              onClick={exportToPdf}
              disabled={loading || !employeeVisits.length}
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
            <PaginatedTable data={employeeVisits} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllVisitsEmployeePage;
