import { fetchActiveDiscounts } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const useActiveDiscounts = () => {
  const dispatch = useAppDispatch();

  const {
    activeDiscounts,
    loading: { FETCH_ACTIVE_DISCOUNTS },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    if (!activeDiscounts.length) {
      dispatch(fetchActiveDiscounts());
    }
  }, [activeDiscounts.length]);

  return { activeDiscounts, loading: FETCH_ACTIVE_DISCOUNTS };
};

export default useActiveDiscounts;
