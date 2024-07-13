import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/slice";
import { companySlice } from "./features/company/slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    company: companySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
