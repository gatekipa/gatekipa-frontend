import { fetchEmergencyListByType } from '@/app/features/employee/thunk';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { EmergencyTab } from '@/pages/dashboard/emergency';
import { useEffect } from 'react';

const useEmergencyReports = (type: EmergencyTab) => {
  const dispatch = useAppDispatch();

  const { emergency, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    // if (emergency[type].length) return;
    dispatch(fetchEmergencyListByType({ type }));
  }, [type]);

  return { emergency, loading };
};

export default useEmergencyReports;
