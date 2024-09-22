import { setSelectedPlan } from "@/app/features/pricing/slice";
import {
  createPaymentIntent,
  IAssignFeature,
  IPlan,
} from "@/app/features/pricing/thunk";
import { useAppDispatch } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PromotionalPricingModal from "../promotionalPricingModal";
import { getUserPlanId } from "@/utils";

const PlanCard: React.FC<{
  plan: IPlan;
  gradientClass: string;
  assignedFeatures: IAssignFeature[];
  onPlanStartedClick?: () => void;
}> = ({ plan, gradientClass, assignedFeatures, onPlanStartedClick }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(true);
  const [showPromotionalPricingModal, setShowPromotionalPricingModal] =
    useState<boolean>(false);

  const onPlanClickHandler = useCallback(async () => {
    try {
      if (plan.isPromotionalPlan) {
        setShowPromotionalPricingModal(true);
        return;
      }

      dispatch(setSelectedPlan(plan));
      await dispatch(
        createPaymentIntent({
          actualAmount: plan.price,
          payableAmount: plan.price,
          noOfMonths: 0,
        })
      ).unwrap();

      navigate(`checkout/${plan.id}`);
    } catch (error) {
      toast.error(error as string);
    }
  }, [plan, dispatch]);

  const hasSamePlan = useMemo(() => {
    const userPlanId = getUserPlanId();
    return userPlanId === plan.id;
  }, [plan]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={plan.id}
      className={`rounded-2xl shadow-xl overflow-hidden`}
    >
      <div className={`bg-gradient-to-br ${gradientClass} p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2 flex justify-between items-center">
          {plan.planName.toUpperCase()}{" "}
          {plan.isPromotionalPlan && (
            <Badge className="opacity-70">LIMITED OFFER</Badge>
          )}
        </h2>
        <p className="opacity-90 mb-4">{plan.description}</p>
        <div className="text-4xl font-bold mb-1">
          ${plan.price}
          <span className="text-sm font-normal">
            /{plan.subscriptionType.toLowerCase()}
          </span>
        </div>
      </div>
      <div className="bg-white p-6">
        <ul className="mb-6">
          {assignedFeatures.flatMap((feature) =>
            feature.subFeature.map((subFeature, index) => (
              <li key={index} className="flex items-start mb-1">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-950">{subFeature.name}</span>
              </li>
            ))
          )}
        </ul>
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {plan?.isPromotionalPlan && (
                <>
                  <h3 className="font-semibold mb-2 text-gray-950">
                    Promotional Pricing
                  </h3>
                  <ul className="mb-4">
                    {plan.promotionalPricing.map((promo, index) => (
                      <li key={index} className="mb-1 text-gray-700 flex ">
                        <CheckIcon className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        {promo.noOfMonths} months: ${promo.discountedPrice}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h3 className="font-semibold mb-2 text-gray-950">Sub Features</h3>
              <ul>
                {assignedFeatures.flatMap((feature) =>
                  feature.subFeature.map((subFeature, index) => (
                    <li key={index} className="flex items-start mb-1">
                      <CheckIcon className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-950">{subFeature.name}</span>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          {showMore ? "Show Less" : "Show More"}
          {showMore ? (
            <ChevronUpIcon className="w-5 h-5 ml-1" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 ml-1" />
          )}
        </button>

        {!hasSamePlan && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 w-full bg-gradient-to-r ${gradientClass} text-white py-2 px-4 rounded-full transition-all duration-200 hover:shadow-lg`}
            onClick={() => {
              onPlanStartedClick ? onPlanStartedClick() : onPlanClickHandler();
            }}
          >
            Choose Plan
          </motion.button>
        )}
      </div>
      {showPromotionalPricingModal && (
        <PromotionalPricingModal
          open={showPromotionalPricingModal}
          onClose={() => setShowPromotionalPricingModal(false)}
          pricingPlan={plan}
        />
      )}
    </motion.div>
  );
};

export default PlanCard;
