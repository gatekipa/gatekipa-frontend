import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  FetchCompanyUserParams,
  fetchCompanyUsersThunk,
} from "@/app/features/company/thunk";

const useCompanyUsers = () => {
  const dispatch = useAppDispatch();

  const { companyUsers, loading } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (!companyUsers.length) dispatch(fetchCompanyUsersThunk({}));
  }, [companyUsers.length]);

  const filterFn = useCallback((query: Partial<FetchCompanyUserParams>) => {
    dispatch(fetchCompanyUsersThunk(query));
  }, []);

  return { companyUsers, loading, filterFn };
};

export default useCompanyUsers;
