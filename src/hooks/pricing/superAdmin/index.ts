import { useEffect } from "react";
import { fetchSuperAdminPricingPlans } from "@/app/features/pricing/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const useSuperAdminPricingPlans = () => {
  const dispatch = useAppDispatch();

  const {
    superAdminPricingPlans: plans,
    loading: { FETCH_SUPER_ADMIN_PRICING_PLANS },
  } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    if (!plans.length) dispatch(fetchSuperAdminPricingPlans());
  }, [plans.length]);

  return { plans, loading: FETCH_SUPER_ADMIN_PRICING_PLANS };
};

export default useSuperAdminPricingPlans;
