import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import {
  applyCouponDiscount,
  confirmPayment,
} from "@/app/features/pricing/thunk";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePricingPlanById } from "@/hooks/pricing";

const CheckoutPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<string | undefined>(undefined);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const [couponPayable, setCouponPayable] = useState<{
    discountedAmount: number;
    payableAmount: number;
  }>({ discountedAmount: 0, payableAmount: 0 });

  const { id } = useParams();

  const { plan: receivedPlan } = usePricingPlanById(id!);

  let {
    paymentIntent,
    loading: { APPLY_COUPON_DISCOUNT },
    couponResponse,
  } = useAppSelector((state) => state.pricing);

  const selectedPricing = JSON.parse(
    localStorage.getItem("selectedPromotionalPricing")!
  ) as { noOfMonths: string; discountedPrice: string };

  const onSubmitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const submitResponse = await elements?.submit();

      if (submitResponse?.error) {
        setError(submitResponse?.error?.message!);
        return;
      }

      const paymentInfo = await stripe?.confirmPayment({
        elements: elements!,
        clientSecret: paymentIntent?.clientSecret!,
        confirmParams: {
          return_url: `${import.meta.env.VITE_APP_URL}/dashboard`,
        },
        redirect: "if_required",
      });

      if (paymentInfo?.error) {
        setError(paymentInfo?.error.message);
      } else {
        if (!receivedPlan?.plan?.isPromotionalPlan) {
          await dispatch(
            confirmPayment({
              actualAmount: receivedPlan?.plan?.price!,
              payableAmount: couponPayable?.payableAmount!,
              planId: receivedPlan?.plan?.id!,
              stripePayment: paymentInfo,
              appliedDiscountId: couponResponse?.appliedDiscountId ?? "",
              discountedAmount: couponPayable?.discountedAmount ?? 0,
              noOfMonths:
                receivedPlan?.plan?.subscriptionType === "YEARLY" ? 12 : 0,
            })
          ).unwrap();
        } else {
          await dispatch(
            confirmPayment({
              actualAmount: receivedPlan?.plan?.price!,
              payableAmount: receivedPlan?.plan?.price!,
              planId: receivedPlan?.plan?.id!,
              stripePayment: paymentInfo,
              appliedDiscountId: "",
              discountedAmount: 0,
              noOfMonths:
                receivedPlan?.plan?.subscriptionType === "YEARLY"
                  ? 12
                  : parseInt(selectedPricing.noOfMonths) ?? 0,
            })
          ).unwrap();
        }

        toast.success("Payment successful");

        navigate("/dashboard");
      }
    },
    [
      paymentIntent,
      elements,
      paymentIntent?.clientSecret,
      receivedPlan,
      couponResponse,
      selectedPricing,
      couponPayable,
    ]
  );

  const onApplyCoupon = useCallback(async () => {
    try {
      setError("");
      const response = await dispatch(
        applyCouponDiscount({
          code: coupon!,
          payableAmount: receivedPlan?.plan.price!,
        })
      ).unwrap();
      setDiscountedAmount(response.discountedAmount);

      setCouponPayable({
        discountedAmount: response.discountedAmount!,
        payableAmount: response.payableAmount!,
      });

      toast.success("Coupon Applied Successfully");
    } catch (error) {
      setError(error as string);
    }
  }, [coupon, receivedPlan]);

  useEffect(() => {
    if (!receivedPlan) return;

    if (!receivedPlan?.plan?.isPromotionalPlan) {
      setCouponPayable({
        discountedAmount: 0,
        payableAmount: receivedPlan.plan.price,
      });
    } else {
      const selectedPromotionalPricing = JSON.parse(
        localStorage.getItem("selectedPromotionalPricing")!
      ) as { noOfMonths: string; discountedPrice: string };

      if (!selectedPromotionalPricing) return;
      setCouponPayable({
        discountedAmount: 0,
        payableAmount:
          parseInt(selectedPromotionalPricing?.discountedPrice!) ?? 0,
      });
    }
  }, [receivedPlan]);

  return (
    <div className="h-1/2 my-auto">
      <Card className="container mx-auto max-w-3xl relative">
        <div
          className={`absolute top-0 right-0 text-white bg-red-600 py-1 px-4 rounded-bl-lg rounded-tr-lg font-semibold shadow-md`}
        >
          {receivedPlan?.plan?.planName?.toUpperCase()}
        </div>
        <CardHeader title="Payment">
          <h2 className="text-3xl font-semibold">Checkout</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler} className="space-y-3">
            <PaymentElement
              onChange={(event) => {
                event.complete
                  ? setIsFormComplete(true)
                  : setIsFormComplete(false);
              }}
            />
            {!receivedPlan?.plan?.isPromotionalPlan && (
              <div className="flex items-center gap-x-2">
                <div className="w-full space-y-1">
                  <Label className="text-sm">Coupon Code</Label>
                  <Input
                    placeholder="Please Enter The Coupon Code"
                    className="placeholder:text-xs"
                    value={coupon}
                    disabled={!isFormComplete || !!discountedAmount}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                {!discountedAmount ? (
                  <Button
                    type="button"
                    className="mt-6"
                    disabled={!coupon || APPLY_COUPON_DISCOUNT}
                    onClick={onApplyCoupon}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-6"
                    onClick={() => {
                      setCoupon("");
                      setDiscountedAmount(null);
                      setCouponPayable({
                        discountedAmount: 0,
                        payableAmount: receivedPlan?.plan?.price ?? 0,
                      });
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
            )}

            {!receivedPlan?.plan?.isPromotionalPlan ? (
              <div className="flex items-center justify-between">
                <div className="text-sm">Discount Amount</div>
                <div className="text-sm">
                  ${couponPayable?.discountedAmount}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Your payable amount for {selectedPricing?.noOfMonths} Months
                </div>
                <div className="text-base">${couponPayable?.payableAmount}</div>
              </div>
            )}

            <div className="w-full">
              <Button
                type="submit"
                className="w-full"
                disabled={!stripe || !elements}
              >
                Pay ${couponPayable.payableAmount}
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm my-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
