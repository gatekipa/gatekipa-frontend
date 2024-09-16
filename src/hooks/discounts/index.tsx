import { useEffect } from "react";
import { fetchDiscounts } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const useDiscounts = () => {
  const dispatch = useAppDispatch();

  const {
    discounts,
    loading: { FETCH_DISCOUNTS },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, []);

  return { discounts, loading: FETCH_DISCOUNTS };
};

export default useDiscounts;
