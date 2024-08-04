import { fetchVisitorReports } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

const useVisitorReports = () => {
  const dispatch = useAppDispatch();

  const { visitorVisits, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchVisitorReports());
  }, []);

  return { visitorVisits, loading };
};

export default useVisitorReports;
