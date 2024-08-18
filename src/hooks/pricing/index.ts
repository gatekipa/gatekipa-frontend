import { fetchPricingPlans } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";

const usePricingPlans = () => {
  const dispatch = useAppDispatch();

  const {
    plans,
    loading: { FETCH_PLANS },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    if (!plans.length) dispatch(fetchPricingPlans());
  }, [plans.length]);

  return { plans, loading: FETCH_PLANS };
};

export default usePricingPlans;
