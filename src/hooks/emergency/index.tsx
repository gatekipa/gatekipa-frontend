import { fetchEmergencyListByType } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

const useEmergencyReports = (type: 'employee' | 'visitor') => {
  const dispatch = useAppDispatch();

  const { emergency, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmergencyListByType({ type }));
  }, []);

  return { emergency: emergency[type], loading };
};

export default useEmergencyReports;
