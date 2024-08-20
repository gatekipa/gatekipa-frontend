import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  confirmPayment,
  createPaymentIntent,
  fetchInvoices,
  fetchPricingPlans,
  IInvoice,
  IPaymentIntent,
  IPlan,
} from "./thunk";
import { ICompanyResponse } from "../company/thunk";

enum PricingApiEndpoint {
  FETCH_PLANS = "FETCH_PLANS",
  CREATE_PAYMENT_INTENT = "CREATE_PAYMENT_INTENT",
  CONFIRM_PAYMENT = "CONFIRM_PAYMENT",
  INVOICE = "INVOICE",
}

export interface PricingState {
  selectedPlan: IPlan | null;
  paymentSuccessResponse: ICompanyResponse | null;
  paymentIntent: IPaymentIntent | null;
  loading: { [key in PricingApiEndpoint]?: boolean };
  plans: IPlan[];
  invoices: IInvoice[];
}

const initialState: PricingState = {
  plans: [],
  selectedPlan: null,
  paymentIntent: null,
  paymentSuccessResponse: null,
  loading: {
    [PricingApiEndpoint.FETCH_PLANS]: false,
    [PricingApiEndpoint.CREATE_PAYMENT_INTENT]: false,
    [PricingApiEndpoint.CONFIRM_PAYMENT]: false,
    [PricingApiEndpoint.INVOICE]: false,
  },
  invoices: [],
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
      confirmPayment.fulfilled,
      (state, action: PayloadAction<ICompanyResponse>) => {
        state.paymentSuccessResponse = action.payload;
        console.log("action.payload :>> ", action.payload);
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
      }
    );
    builder.addCase(confirmPayment.pending, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = true;
    });
    builder.addCase(confirmPayment.rejected, (state) => {
      state.loading[PricingApiEndpoint.CONFIRM_PAYMENT] = false;
    });
  },
});

export const { setSelectedPlan } = pricingSlice.actions;

export default pricingSlice.reducer;
