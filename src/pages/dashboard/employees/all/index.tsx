import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import useAllEmployeeVisits from '@/hooks/employees/allVisits';
import { ColumnDef } from '@tanstack/react-table';
import { IEmployeeReport } from '@/app/features/employee/thunk';
import ColumnHeader from '@/components/shared/columnHeader';

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

const AllVisitsEmployeePage = () => {
  const [query, setQuery] = useState({
    employeeNo: '',
    emailAddress: '',
    mobileNo: '',
  });

  const { employeeVisits, loading } = useAllEmployeeVisits();

  const onExportClickHandler = useCallback(() => {
    const headerRowKeys = {
      id: true,
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
        id: record.id,
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
      head: [['email', 'name', 'employeeNo']],
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
            <Button className='text-xs'>Search</Button>
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
            <PaginatedTable data={employeeVisits} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllVisitsEmployeePage;
