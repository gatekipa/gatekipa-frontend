import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IPlan {
  id: string;
  planName: string;
  price: number;
  subscriptionType: string;
  description: string;
  features: {
    title: string;
    details: { allowed: boolean; text: string }[];
  }[];
  isActive: boolean;
}

export interface IPaymentIntentRequest {
  actualAmount: number;
  payableAmount: number;
}

export interface IConfirmPaymentRequest {
  actualAmount: number;
  payableAmount: number;
  planId: string;
  stripePayment: any;
}

export interface IPaymentIntent {
  clientSecret: string;
}

const fetchPricingPlans: AsyncThunk<IPlan[], void, {}> = createAsyncThunk(
  "pricing/plans",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/plan`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const createPaymentIntent: AsyncThunk<
  IPaymentIntent,
  IPaymentIntentRequest,
  {}
> = createAsyncThunk(
  "pricing/payment-intent",
  async (paymentIntentRequest, thunkAPI) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/subscription/create-payment-intent`,
        paymentIntentRequest,
        {
          withCredentials: true,
        }
      );

      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const confirmPayment: AsyncThunk<any, IConfirmPaymentRequest, {}> =
  createAsyncThunk(
    "pricing/confirm-payment",
    async (paymentIntentRequest, thunkAPI) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/subscription/confirm-payment`,
          paymentIntentRequest,
          {
            withCredentials: true,
          }
        );

        return response.data.data;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message
        ) {
          return thunkAPI.rejectWithValue(axiosError.response.data.message);
        } else {
          return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
      }
    }
  );

export { fetchPricingPlans, createPaymentIntent, confirmPayment };
