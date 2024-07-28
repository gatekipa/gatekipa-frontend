import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  FetchVisitorsParams,
  fetchVisitorsThunk,
} from '@/app/features/company/thunk';

const useVisitors = () => {
  const dispatch = useAppDispatch();

  const { visitors, loading } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (!visitors.length) dispatch(fetchVisitorsThunk({}));
  }, [visitors.length]);

  const filterFn = useCallback((query: FetchVisitorsParams) => {
    dispatch(fetchVisitorsThunk(query));
  }, []);

  return { visitors, loading, filterFn };
};

export default useVisitors;
