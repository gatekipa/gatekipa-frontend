import { useEffect } from 'react';
import { fetchEmployeeVisitsThunk } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useEmployeeVisits = (employeeId: string) => {
  const dispatch = useAppDispatch();

  const { visits, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (!visits.length) dispatch(fetchEmployeeVisitsThunk({ employeeId }));
  }, [visits.length]);

  return { visits, loading };
};

export default useEmployeeVisits;
