import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchCompanyByIdThunk } from "@/app/features/company/thunk";
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

export default useCompany;
