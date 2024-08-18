import { IPlan } from "@/app/features/pricing/thunk";
import usePricingPlans from "@/hooks/pricing";
import { X } from "lucide-react";
import React from "react";

const PlanCard: React.FC<{
  plan: IPlan;
}> = ({ plan }) => {
  return (
    <div className="flex flex-col items-center bg-slate-950 p-8 rounded-lg shadow-xl max-w-sm">
      <div>
        <h2 className="font-extrabold shadow-slate-500 text-3xl text-center mb-2 uppercase">
          {plan.planName}
        </h2>
        <p className="opacity-60 text-center text-sm">{plan.description}</p>
        <div className="flex flex-col items-center my-8">
          <p className="font-extrabold text-4xl">${plan.price}</p>
          <p className="text-sm opacity-60">/month</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        {plan.features.map((feature, index) => (
          <div key={index}>
            <p className="font-bold my-2">{feature.title}</p>
            {feature.details.map((detail, idx) => (
              <p key={idx} className="flex items-center text-sm">
                {detail.allowed ? (
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 mr-2 font-bold text-green-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {detail.text}
                  </div>
                ) : (
                  <div className="flex">
                    <X size={24} className="mr-2 font-bold text-red-600" />
                    {detail.text}
                  </div>
                )}
              </p>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border-white border-2 rounded-xl hover:bg-white hover:text-slate-950">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

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
