import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPricingPlans, IPlan } from "./thunk";

enum PricingApiEndpoints {
  FETCH_PLANS = "FETCH_PLANS",
}

export interface PricingState {
  loading: { [key in PricingApiEndpoints]?: boolean };
  plans: IPlan[];
}

const initialState: PricingState = {
  plans: [],
  loading: {
    [PricingApiEndpoints.FETCH_PLANS]: false,
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
  },
});

export default pricingSlice.reducer;
