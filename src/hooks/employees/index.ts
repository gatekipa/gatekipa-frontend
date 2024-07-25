import { useCallback, useEffect } from 'react';
import {
  fetchEmployeesThunk,
  IEmployeeQuery,
} from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const useEmployees = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployeesThunk({}));
  }, []);

  const filterFn = useCallback(
    (query: IEmployeeQuery) => {
      dispatch(fetchEmployeesThunk(query));
    },
    [dispatch]
  );

  const { employees, loading } = useAppSelector((state) => state.employee);

  return { employees, loading, filterFn };
};

export default useEmployees;
