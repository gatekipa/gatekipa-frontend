import { useEffect } from 'react';
import { fetchEmployeeVisitsThunk } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useEmployeeVisits = (employeeId: string) => {
  const dispatch = useAppDispatch();

  const { visits, employee, loading } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    // !Temporary fix for now to reload screen data after checkout.
    //if (!visits.length) dispatch(fetchEmployeeVisitsThunk({ employeeId }));
    dispatch(fetchEmployeeVisitsThunk({ employeeId }));
  }, [visits.length]);

  return { visits, loading, employee };
};

export default useEmployeeVisits;
