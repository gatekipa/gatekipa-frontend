import React from "react";
import PlanCard from "@/components/features/pricing/planCards";
import usePricingPlans from "@/hooks/pricing";

const gradients: readonly string[] = [
  "from-gray-700 to-gray-900",
  "from-gray-600 to-gray-800",
  "from-gray-500 to-gray-700",
  "from-gray-400 to-gray-600",
  "from-gray-300 to-gray-500",
];

const PricingPage: React.FC = () => {
  const { plans } = usePricingPlans();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-950">
          Choose Your Plan
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Select the perfect plan for your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
          {plans.map((item, index) => (
            <PlanCard
              key={item.plan.id}
              plan={item.plan}
              assignedFeatures={item.assignedFeatures}
              gradientClass={gradients[index % gradients.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
