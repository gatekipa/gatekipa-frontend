import { useEffect } from 'react';
import { fetchAllEmployeesVisits } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useAllEmployeeVisits = () => {
  const dispatch = useAppDispatch();

  const { employeeVisits, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchAllEmployeesVisits());
  }, []);

  return { employeeVisits, loading };
};

export default useAllEmployeeVisits;
