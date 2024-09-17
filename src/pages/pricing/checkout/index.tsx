import React, { FormEvent, useCallback, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/app/features/pricing/thunk";
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

  const { paymentIntent, selectedPlan } = useAppSelector(
    (state) => state.pricing
  );

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
        await dispatch(
          confirmPayment({
            actualAmount: selectedPlan?.price!,
            payableAmount: selectedPlan?.price!,
            planId: selectedPlan?.id!,
            stripePayment: paymentInfo,
          })
        ).unwrap();

        toast.success("Payment successful");

        navigate("/dashboard");
      }
    },
    [paymentIntent, elements, paymentIntent?.clientSecret, selectedPlan]
  );

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
              <Button type="button" className="mt-6" disabled={!coupon}>
                Apply
              </Button>
            </div>
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
