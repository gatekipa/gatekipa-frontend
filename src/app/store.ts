import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/slice";
import { companySlice } from "./features/company/slice";
import { employeeSlice } from "./features/employee/slice";
import { pricingSlice } from "./features/pricing/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    company: companySlice.reducer,
    employee: employeeSlice.reducer,
    pricing: pricingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
