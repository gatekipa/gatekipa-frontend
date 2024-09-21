import { ThemeProvider } from "@/components/providers/theme";
import Navbar from "@/components/shared/navbar";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripeOptions: StripeElementsOptions = {
  mode: "payment",
  amount: 1000,
  currency: "usd",
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
  appearance: {},
};

const PricingLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const otp = JSON.parse(localStorage.getItem("otp")!) as {
      isVerified: boolean;
    };

    if (!otp.isVerified) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Elements stripe={stripe} options={stripeOptions}>
        <div className="flex h-screen flex-col">
          <Navbar />
          <Outlet />
        </div>
      </Elements>
    </ThemeProvider>
  );
};

export default PricingLayout;
