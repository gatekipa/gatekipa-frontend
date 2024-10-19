import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchReceptionVisitorsThunk } from "@/app/features/company/thunk";

const useReceptionVisitors = () => {
  const dispatch = useAppDispatch();

  const { receptionVisitors, loading } = useAppSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(fetchReceptionVisitorsThunk());
  }, []);

  return { receptionVisitors, loading };
};

export default useReceptionVisitors;
