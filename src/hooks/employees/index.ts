import { useCallback, useEffect } from 'react';
import {
  fetchEmployeesThunk,
  IEmployeeQuery,
} from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useEmployees = () => {
  const dispatch = useAppDispatch();

  const { employees, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (!employees.length) dispatch(fetchEmployeesThunk({}));
  }, [employees.length]);

  const filterFn = useCallback((query: IEmployeeQuery) => {
    dispatch(fetchEmployeesThunk(query));
  }, []);

  return { employees, loading, filterFn };
};

export default useEmployees;
