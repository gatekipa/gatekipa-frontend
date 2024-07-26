import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchShiftsThunk } from '@/app/features/employee/thunk';

const useShifts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShiftsThunk());
  }, []);

  const { shifts, loading } = useAppSelector((state) => state.employee);

  return { shifts, loading };
};

export default useShifts;
