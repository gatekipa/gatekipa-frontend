import React, { FormEvent, useCallback, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState<string | undefined>(undefined);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  let {
    paymentIntent,
    selectedPlan,
    loading: { APPLY_COUPON_DISCOUNT },
    couponResponse,
  } = useAppSelector((state) => state.pricing);

  const getSelectedPlan = () => {
    return selectedPlan ?? JSON.parse(localStorage.getItem("selectedPlan")!);
  };

  selectedPlan = getSelectedPlan();

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
        if (!selectedPlan?.isPromotionalPlan) {
          await dispatch(
            confirmPayment({
              actualAmount: selectedPlan?.price!,
              payableAmount: selectedPlan?.price!,
              planId: selectedPlan?.id!,
              stripePayment: paymentInfo,
              appliedDiscountId: couponResponse?.appliedDiscountId ?? "",
              discountedAmount: couponResponse?.discountedAmount ?? 0,
              noOfMonths: 0,
            })
          ).unwrap();
        } else {
          await dispatch(
            confirmPayment({
              actualAmount: selectedPlan?.price!,
              payableAmount: selectedPlan?.price!,
              planId: selectedPlan?.id!,
              stripePayment: paymentInfo,
              appliedDiscountId: couponResponse?.appliedDiscountId ?? "",
              discountedAmount: parseInt(selectedPricing.discountedPrice) ?? 0,
              noOfMonths: parseInt(selectedPricing.noOfMonths) ?? 0,
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
      selectedPlan,
      couponResponse,
      selectedPricing,
    ]
  );

  const onApplyCoupon = useCallback(async () => {
    try {
      await dispatch(
        applyCouponDiscount({
          code: coupon!,
          payableAmount: selectedPlan?.price!,
        })
      ).unwrap();
      toast.success("Coupon Applied Successfully");
    } catch (error) {
      setError(error as string);
    }
  }, [coupon]);

  return (
    <div className="h-1/2 my-auto">
      <Card className="container mx-auto max-w-3xl relative">
        <div
          className={`absolute top-0 right-0 text-white bg-red-600 py-1 px-4 rounded-bl-lg rounded-tr-lg font-semibold shadow-md`}
        >
          {selectedPlan?.planName?.toUpperCase() ?? "STANDARD"}
        </div>
        <CardHeader title="Payment">
          <h2 className="text-3xl font-semibold">Checkout</h2>
        </CardHeader>
        <CardContent>
          <form onClick={onSubmitHandler} className="space-y-3">
            <PaymentElement
              onChange={(event) => {
                event.complete
                  ? setIsFormComplete(true)
                  : setIsFormComplete(false);
              }}
            />
            {!selectedPlan?.isPromotionalPlan && (
              <div className="flex items-center gap-x-2">
                <div className="w-full space-y-1">
                  <Label className="text-sm">Coupon Code</Label>
                  <Input
                    placeholder="Please Enter The Coupon Code"
                    className="placeholder:text-xs"
                    value={coupon}
                    disabled={!isFormComplete}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  className="mt-6"
                  disabled={!coupon || APPLY_COUPON_DISCOUNT}
                  onClick={onApplyCoupon}
                >
                  Apply
                </Button>
              </div>
            )}

            {couponResponse?.discountedAmount ? (
              <div className="flex items-center justify-between">
                <div className="text-sm">Discounted Amount</div>
                <div className="text-sm">
                  -${couponResponse?.discountedAmount}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  Your payable amount for {selectedPricing?.noOfMonths} Months
                </div>
                <div className="text-base">
                  ${selectedPricing?.discountedPrice}
                </div>
              </div>
            )}
            <div className="w-full">
              <Button
                type="submit"
                className="w-full"
                disabled={!stripe || !elements}
              >
                Pay Now
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
