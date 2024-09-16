import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  confirmPayment,
  createDiscount,
  createPaymentIntent,
  createPricingPlan,
  fetchDiscounts,
  fetchFeatures,
  fetchInvoices,
  fetchPricingPlanById,
  fetchPricingPlans,
  IFeature,
  IInvoice,
  IPaymentIntent,
  IPlan,
  IPlanDetail,
  TransformedFeatureResponse,
} from "./thunk";
import { ICompanyResponse } from "../company/thunk";
import { IDiscount } from "@/components/features/discount/create";

enum PricingApiEndpoint {
  FETCH_PLANS = "FETCH_PLANS",
  FETCH_PLAN = "FETCH_PLAN",
  FETCH_DISCOUNTS = "FETCH_DISCOUNTS",
  CREATE_PAYMENT_INTENT = "CREATE_PAYMENT_INTENT",
  CONFIRM_PAYMENT = "CONFIRM_PAYMENT",
  INVOICE = "INVOICE",
  CREATE_PLAN = "CREATE_PLAN",
  FETCH_FEATURES = "FETCH_FEATURES",
  CREATE_DISCOUNT = "CREATE_DISCOUNT",
}

export interface PricingState {
  selectedPlan: IPlan | null;
  paymentSuccessResponse: ICompanyResponse | null;
  paymentIntent: IPaymentIntent | null;
  loading: { [key in PricingApiEndpoint]?: boolean };
  plans: IPlan[];
  plan: IPlanDetail | null;
  invoices: IInvoice[];
  modules: IFeature[];
  permissions: IFeature[];
  discounts: any[];
}

const initialState: PricingState = {
  plans: [],
  plan: null,
  selectedPlan: null,
  paymentIntent: null,
  paymentSuccessResponse: null,
  loading: {
    [PricingApiEndpoint.FETCH_PLANS]: false,
    [PricingApiEndpoint.FETCH_PLAN]: false,
    [PricingApiEndpoint.CREATE_PAYMENT_INTENT]: false,
    [PricingApiEndpoint.CONFIRM_PAYMENT]: false,
    [PricingApiEndpoint.INVOICE]: false,
    [PricingApiEndpoint.CREATE_PLAN]: false,
    [PricingApiEndpoint.FETCH_FEATURES]: false,
    [PricingApiEndpoint.FETCH_DISCOUNTS]: false,
    [PricingApiEndpoint.CREATE_DISCOUNT]: false,
  },
  invoices: [],
  modules: [],
  permissions: [],
  discounts: [],
};

export const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setSelectedPlan: (state, action: PayloadAction<IPlan>) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPricingPlans.fulfilled,
      (state, action: PayloadAction<IPlan[]>) => {
        state.plans = action.payload;
        state.loading[PricingApiEndpoint.FETCH_PLANS] = false;
      }
    );
    builder.addCase(fetchPricingPlans.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLANS] = true;
    });
    builder.addCase(fetchPricingPlans.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLANS] = false;
    });
    builder.addCase(
      fetchInvoices.fulfilled,
      (state, action: PayloadAction<IInvoice[]>) => {
        state.invoices = action.payload;
        state.loading[PricingApiEndpoint.INVOICE] = false;
      }
    );
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading[PricingApiEndpoint.INVOICE] = true;
    });
    builder.addCase(fetchInvoices.rejected, (state) => {
      state.loading[PricingApiEndpoint.INVOICE] = false;
    });
    builder.addCase(
      fetchFeatures.fulfilled,
      (state, action: PayloadAction<TransformedFeatureResponse>) => {
        if (action.payload.type === "MODULE") {
          state.modules = action.payload.data;
        } else {
          state.permissions = action.payload.data;
        }
        state.loading[PricingApiEndpoint.FETCH_FEATURES] = false;
      }
    );
    builder.addCase(fetchFeatures.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_FEATURES] = true;
    });
    builder.addCase(fetchFeatures.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_FEATURES] = false;
    });
    builder.addCase(
      fetchPricingPlanById.fulfilled,
      (state, action: PayloadAction<IPlanDetail>) => {
        state.plan = action.payload;
        state.loading[PricingApiEndpoint.FETCH_PLAN] = false;
      }
    );
    builder.addCase(fetchPricingPlanById.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLAN] = true;
    });
    builder.addCase(fetchPricingPlanById.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_PLAN] = false;
    });
    builder.addCase(
      createPaymentIntent.fulfilled,
      (state, action: PayloadAction<IPaymentIntent>) => {
        state.paymentIntent = action.payload;
        state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = false;
      }
    );
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = true;
    });
    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PAYMENT_INTENT] = false;
    });
    builder.addCase(
      createPricingPlan.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.paymentIntent = action.payload;
        console.log("action :>> ", action.payload);
        state.loading[PricingApiEndpoint.CREATE_PLAN] = false;
      }
    );
    builder.addCase(createPricingPlan.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PLAN] = true;
    });
    builder.addCase(createPricingPlan.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_PLAN] = false;
    });
    builder.addCase(
      confirmPayment.fulfilled,
      (state, action: PayloadAction<ICompanyResponse>) => {
        state.paymentSuccessResponse = action.payload;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ data: action.payload })
        );
        state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
      }
    );
    builder.addCase(confirmPayment.pending, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = true;
    });
    builder.addCase(confirmPayment.rejected, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
    });
    builder.addCase(
      fetchDiscounts.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.discounts = action.payload;
        state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = false;
      }
    );
    builder.addCase(fetchDiscounts.pending, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = true;
    });
    builder.addCase(fetchDiscounts.rejected, (state) => {
      state.loading[PricingApiEndpoint.FETCH_DISCOUNTS] = false;
    });
    builder.addCase(
      createDiscount.fulfilled,
      (state, action: PayloadAction<IDiscount>) => {
        // state.discounts = action.payload;
        console.log("action :>> DS", action.payload);
        state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = false;
      }
    );
    builder.addCase(createDiscount.pending, (state) => {
      state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = true;
    });
    builder.addCase(createDiscount.rejected, (state) => {
      state.loading[PricingApiEndpoint.CREATE_DISCOUNT] = false;
    });
  },
});

export const { setSelectedPlan } = pricingSlice.actions;

export default pricingSlice.reducer;
