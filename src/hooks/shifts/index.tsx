import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchShiftsThunk } from '@/app/features/employee/thunk';

const useShifts = () => {
  const dispatch = useAppDispatch();

  const { shifts, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    if (!shifts.length) dispatch(fetchShiftsThunk());
  }, [shifts.length]);

  return { shifts, loading };
};

export default useShifts;
