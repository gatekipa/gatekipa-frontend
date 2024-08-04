import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useVisitorReports from '@/hooks/visitors/reports';
import { DownloadIcon } from '@radix-ui/react-icons';
import React from 'react';

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
            <PaginatedTable data={visitorVisits} columns={[]} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AllVisitorVisitsPage;
