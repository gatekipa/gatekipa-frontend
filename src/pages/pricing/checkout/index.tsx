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

const CheckoutPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { paymentIntent } = useAppSelector((state) => state.pricing);

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
            actualAmount: 100,
            payableAmount: 100,
            planId: "1",
            stripePayment: paymentInfo,
          })
        ).unwrap();

        toast.success("Payment successful");

        navigate("/dashboard");
      }
    },
    [paymentIntent, elements, paymentIntent?.clientSecret]
  );

  return (
    <div className="h-1/2 my-auto">
      <Card className="container mx-auto max-w-3xl">
        <CardHeader title="Payment">
          <h2 className="text-3xl font-semibold">Checkout</h2>
        </CardHeader>
        <CardContent>
          <form onClick={onSubmitHandler} className="space-y-3">
            <PaymentElement />
            <div className="text-end">
              <Button type="submit">Pay Now</Button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
