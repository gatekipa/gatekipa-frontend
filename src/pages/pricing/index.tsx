import PlanCard from "@/components/features/pricing/planCards";
import usePricingPlans from "@/hooks/pricing";
import React from "react";

const PricingPage: React.FC = () => {
  const { plans } = usePricingPlans();

  return (
    <div className="h-screen flex justify-center items-center gap-x-2 text-white">
      {plans.map((plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default PricingPage;
