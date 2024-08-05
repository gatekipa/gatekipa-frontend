import PaginatedTable from '@/components/shared/paginatedTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useEmployeeVisits from '@/hooks/employees/visits';
import { getUserEmployeeId, getUserRole } from '@/utils';
import React, { useCallback, useState } from 'react';
import EmployeeCheckoutModal from '../visit/checkoutModal';
import { columns } from '@/pages/dashboard/employees/visits';
import { toast } from 'sonner';
import { employeeCheckInThunk } from '@/app/features/employee/thunk';
import { useAppDispatch } from '@/app/hooks';

const EmployeeDashboard: React.FC = () => {
  const employeeId = getUserEmployeeId();
  const dispatch = useAppDispatch();

  const { visits, loading, employee } = useEmployeeVisits(employeeId!);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);

  const handleCheckIn = useCallback(async () => {
    try {
      await dispatch(
        employeeCheckInThunk({ employeeId: employeeId! })
      ).unwrap();
      toast.success('Checked in successfully');
    } catch (error) {
      toast.error(`${error}`);
    }
  }, [employeeId]);

  return (
    <Card>
      <CardContent>
        <div className='mt-8 mx-5'>
          <h2 className='text-2xl font-semibold'>Employee Dashboard</h2>
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
          <img
            src='https://img.freepik.com/free-photo/portrait-young-business-man-posing-with-crossed-arms_23-2149206527.jpg'
            alt='Employee'
            className='w-36 h-36 rounded-sm object-cover'
          />
        </div>
      </div>
      <div className='mx-8 mb-8'>
        <div className='space-x-2 md:translate-y-14'>
          {getUserRole() !== 'ADMIN' && (
            <>
              <Button className='text-xs' size='sm' onClick={handleCheckIn}>
                Check In
              </Button>
              <Button
                className='text-xs'
                size='sm'
                onClick={() => setIsCheckOutModalOpen(true)}
              >
                Check Out
              </Button>
            </>
          )}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PaginatedTable data={visits} columns={columns} />
        )}
      </div>
      {isCheckOutModalOpen && (
        <EmployeeCheckoutModal
          isOpen={isCheckOutModalOpen}
          onClose={() => setIsCheckOutModalOpen(false)}
          employeeId={employeeId!}
        />
      )}
    </Card>
  );
};

export default EmployeeDashboard;
