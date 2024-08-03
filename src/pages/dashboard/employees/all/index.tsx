import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';
import { columns } from '..';
import useEmployees from '@/hooks/employees';
import { toast } from 'sonner';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AllVisitsEmployeePage = () => {
  const [query, setQuery] = useState({
    employeeNo: '',
    emailAddress: '',
    mobileNo: '',
  });

  const { employees, loading } = useEmployees();

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
      companyId: true,
    };
    const headerRow = Object.keys(headerRowKeys);

    // TODO: Add types to dataRows
    let dataRows = [];

    for (const record of employees) {
      dataRows.push({
        id: record.id,
        email: record.emailAddress,
        firstName: record.firstName,
        lastName: record.lastName,
        desgination: record.designation,
        employeeNo: record.employeeNo,
        mobileNo: record.mobileNo,
        dateOfBirth: record.dateOfBirth,
        companyId: record.companyId,
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
  }, [employees]);

  const exportToPdf = useCallback(() => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text('Employee Visits', 14, 22);

    const data = employees.map((employee) => Object.values(employee));

    autoTable(doc, {
      head: [['email', 'name', 'employeeNo']],
      body: data,
    });

    // Save the PDF
    doc.save('table.pdf');
  }, [employees]);

  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-center mt-8'>
          <h2 className='text-2xl font-semibold'>Employee Visits</h2>
          <div className='flex gap-x-2 flex-wrap md:flex-nowrap'>
            <Button
              className='text-xs'
              title='Export to CSV'
              onClick={onExportClickHandler}
            >
              <DownloadIcon className='mr-2' />
              Export to CSV
            </Button>
            <Button
              className='text-xs'
              title='Export to PDF'
              onClick={exportToPdf}
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
            <PaginatedTable data={employees} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllVisitsEmployeePage;
