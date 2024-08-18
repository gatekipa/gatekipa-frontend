import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createPaymentIntent,
  fetchPricingPlans,
  IPaymentIntent,
  IPlan,
} from "./thunk";

enum PricingApiEndpoints {
  FETCH_PLANS = "FETCH_PLANS",
  CREATE_PAYMENT_INTENT = "CREATE_PAYMENT_INTENT",
}

export interface PricingState {
  paymentIntent: IPaymentIntent | null;
  loading: { [key in PricingApiEndpoints]?: boolean };
  plans: IPlan[];
}

const initialState: PricingState = {
  plans: [],
  paymentIntent: null,
  loading: {
    [PricingApiEndpoints.FETCH_PLANS]: false,
    [PricingApiEndpoints.CREATE_PAYMENT_INTENT]: false,
  },
};

export const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchPricingPlans.fulfilled,
      (state, action: PayloadAction<IPlan[]>) => {
        state.plans = action.payload;
        state.loading[PricingApiEndpoints.FETCH_PLANS] = false;
      }
    );
    builder.addCase(fetchPricingPlans.pending, (state) => {
      state.loading[PricingApiEndpoints.FETCH_PLANS] = true;
    });
    builder.addCase(fetchPricingPlans.rejected, (state) => {
      state.loading[PricingApiEndpoints.FETCH_PLANS] = false;
    });
    builder.addCase(
      createPaymentIntent.fulfilled,
      (state, action: PayloadAction<IPaymentIntent>) => {
        state.paymentIntent = action.payload;
        state.loading[PricingApiEndpoints.CREATE_PAYMENT_INTENT] = false;
      }
    );
    builder.addCase(createPaymentIntent.pending, (state) => {
      state.loading[PricingApiEndpoints.CREATE_PAYMENT_INTENT] = true;
    });
    builder.addCase(createPaymentIntent.rejected, (state) => {
      state.loading[PricingApiEndpoints.CREATE_PAYMENT_INTENT] = false;
    });
  },
});

export default pricingSlice.reducer;
