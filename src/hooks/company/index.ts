import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCompanyByIdThunk,
  fetchCompanyThunk,
} from "@/app/features/company/thunk";
import { getCompanyId } from "@/utils";

const useCompany = () => {
  const dispatch = useAppDispatch();

  const { company, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    const companyId = getCompanyId();
    dispatch(fetchCompanyByIdThunk({ id: companyId }));
  }, []);

  return { company, loading: isLoading["FETCH_COMPANY"] };
};

const useCompanies = () => {
  const dispatch = useAppDispatch();

  const { companies, isLoading } = useAppSelector((state) => state.company);

  useEffect(() => {
    if (!companies.length) {
      dispatch(fetchCompanyThunk());
    }
  }, [companies.length]);

  return { companies, loading: isLoading["FETCH_COMPANY"] };
};

export { useCompanies };

export default useCompany;
