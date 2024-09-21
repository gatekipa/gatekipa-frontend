import { IDiscount } from "@/components/features/discount/create";
import { ISendDiscountedMailForm } from "@/components/features/discount/sendDiscountMailModal";
import { SubscriptionType } from "@/pages/pricing/create";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IPlan {
  id: string;
  planName: string;
  price: number;
  subscriptionType: string;
  description: string;
  promotionalPricing: {
    discountedPrice: number;
    noOfMonths: number;
  }[];
  isActive: boolean;
  isPromotionalPlan: boolean;
}

export interface IPaymentIntentRequest {
  actualAmount: number;
  payableAmount: number;
  noOfMonths: number;
}

export interface IConfirmPaymentRequest {
  actualAmount: number;
  payableAmount: number;
  planId: string;
  discountedAmount?: number;
  appliedDiscountId?: string;
  noOfMonths: number;
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

export interface IDiscountModel {
  id: string;
  code: string;
  maxNoUsage: number;
  discountType: string;
  discountValue: number;
  expiryDate: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDiscountedCompany {
  id: string;
  emailAddress: string;
  name: string;
  isSubscriptionActive: boolean;
  companyCode: string;
}

export interface IActiveDiscount extends Pick<IDiscountModel, "code" | "id"> {}

export interface IAssignedFeatureModel {
  featureId: string;
  name: string;
  code: string;
}

export interface IAssignFeature {
  feature: IAssignedFeatureModel;
  subFeature: IAssignedFeatureModel[];
}

export interface IPricingPlanModel {
  plan: IPlan;
  assignedFeatures: IAssignFeature[];
}

export interface ISuperAdminPricingPlan {
  id: string;
  planName: string;
  price: number;
  subscriptionType: string;
  description: string;
  isActive: boolean;
  promotionalPricing: { discountedPrice: number; noOfMonths: number }[];
  isPromotionalPlan: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponDiscountRequest {
  code: string;
  payableAmount: number;
}
export interface ICouponDiscount {
  appliedDiscountId: string;
  discountedAmount: number | null;
  payableAmount: number | null;
}

const fetchPricingPlans: AsyncThunk<IPricingPlanModel[], void, {}> =
  createAsyncThunk("pricing/plans", async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/pricing-plans`,
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
      const response = await axios.put(
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

const fetchDiscounts: AsyncThunk<any, void, {}> = createAsyncThunk(
  "pricing/discounts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/discount`,
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

const createDiscount: AsyncThunk<IDiscountModel, IDiscount, {}> =
  createAsyncThunk("pricing/discount", async (discount, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/discount`,
        discount,
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

const editDiscount: AsyncThunk<IDiscountModel, IDiscountModel, {}> =
  createAsyncThunk("pricing/discount/edit", async (discount, thunkAPI) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/discount/${discount.id}`,
        discount,
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

const deleteDiscount: AsyncThunk<string, { id: string }, {}> = createAsyncThunk(
  "pricing/discount/delete",
  async ({ id }, thunkAPI) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}/discount/${id}`,
        {
          withCredentials: true,
        }
      );

      return id;
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

const fetchDiscountedCompanies: AsyncThunk<IDiscountedCompany[], void, {}> =
  createAsyncThunk("pricing/discounts/companies", async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/company/discount-mailing-list`,
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

const fetchActiveDiscounts: AsyncThunk<IActiveDiscount[], void, {}> =
  createAsyncThunk("pricing/discounts/active", async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/discount/list-active`,
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

const sendDiscountMail: AsyncThunk<any, ISendDiscountedMailForm, {}> =
  createAsyncThunk("pricing/discount/mail", async (request, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/discount/send-emails`,
        { ...request, emailAddress: [request.email] },
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

const fetchSuperAdminPricingPlans: AsyncThunk<
  ISuperAdminPricingPlan[],
  void,
  {}
> = createAsyncThunk("pricing/plans/super-admin", async (_, thunkAPI) => {
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
});

const applyCouponDiscount: AsyncThunk<
  ICouponDiscount,
  ICouponDiscountRequest,
  {}
> = createAsyncThunk("pricing/discount/coupon", async (request, thunkAPI) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/discount/apply-code`,
      request,
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

export {
  fetchPricingPlans,
  createPaymentIntent,
  confirmPayment,
  fetchInvoices,
  createPricingPlan,
  fetchFeatures,
  fetchPricingPlanById,
  editPricingPlan,
  fetchDiscounts,
  createDiscount,
  editDiscount,
  deleteDiscount,
  fetchDiscountedCompanies,
  fetchActiveDiscounts,
  sendDiscountMail,
  fetchSuperAdminPricingPlans,
  applyCouponDiscount,
};
