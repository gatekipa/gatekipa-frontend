import { fetchDiscountedCompanies } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useDiscountedCompanies = () => {
  const dispatch = useAppDispatch();

  const {
    discountedCompanies,
    loading: { FETCH_DISCOUNTED_COMPANIES },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    if (!discountedCompanies.length) {
      dispatch(fetchDiscountedCompanies());
    }
  }, [discountedCompanies.length]);

  return { discountedCompanies, loading: FETCH_DISCOUNTED_COMPANIES };
};

export default useDiscountedCompanies;
