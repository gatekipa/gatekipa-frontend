import PlanCard from "@/components/features/pricing/planCards";
import usePricingPlans from "@/hooks/pricing";
import React from "react";

const PricingPage: React.FC = () => {
  const { plans } = usePricingPlans();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8 space-y-16 text-white md:flex-row md:space-y-0">
      {plans.map((plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default PricingPage;
