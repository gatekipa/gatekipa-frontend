import { SubscriptionType } from "@/pages/pricing/create";
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
  isPromotionalPlan: boolean;
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

export interface IInvoice {
  invoiceNo: string;
  amount: number;
  invoiceStatus: string;
  createdAt: string;
}

export interface IPaymentIntent {
  clientSecret: string;
}

export interface IPlanRequest {
  name: string;
  description: string;
  price: number;
  subscriptionType: SubscriptionType;
  assignedFeatures: { feature: string; subFeature: string[] }[];
  promotionalPricing: { discountedPrice: number; noOfMonths: number }[];
  isActive: boolean;
  isPromotionalPlan: boolean;
}

export interface IPlanDetail {
  plan: IPlan & {
    promotionalPricing: { discountedPrice: number; noOfMonths: number }[];
  };
  assignedFeatures: any[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IFeature {
  id: string;
  type: "MODULE" | "PERMISSION";
  name: string;
}
export interface TransformedFeatureResponse {
  type: "MODULE" | "PERMISSION";
  data: IFeature[];
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

const fetchPricingPlanById: AsyncThunk<IPlanDetail, { id: string }, {}> =
  createAsyncThunk("pricing/plans/id", async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/plan/${id}`,
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
  });

const fetchFeatures: AsyncThunk<
  TransformedFeatureResponse,
  { type: string },
  {}
> = createAsyncThunk("pricing/features", async ({ type }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/feature/${type}`,
      {
        withCredentials: true,
      }
    );

    return { type, data: response.data.data } as TransformedFeatureResponse;
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
});

const fetchInvoices: AsyncThunk<IInvoice[], void, {}> = createAsyncThunk(
  "pricing/invoices",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/invoice`,
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

const createPricingPlan: AsyncThunk<any, IPlanRequest, {}> = createAsyncThunk(
  "pricing/plan",
  async (paymentIntentRequest, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/plan`,
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

const editPricingPlan: AsyncThunk<IPlan, IPlan, {}> = createAsyncThunk(
  "pricing/plan/edit",
  async (plan, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/plan/${plan.id}`,
        plan,
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

export {
  fetchPricingPlans,
  createPaymentIntent,
  confirmPayment,
  fetchInvoices,
  createPricingPlan,
  fetchFeatures,
  fetchPricingPlanById,
  editPricingPlan,
};
