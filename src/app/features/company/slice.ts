import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ICompany,
  IVisitor,
  fetchCompanyThunk,
  fetchVisitorsThunk,
} from "./thunk";

export interface CompanyState {
  companies: ICompany[];
  visitors: IVisitor[];
  loading: boolean;
}

const initialState: CompanyState = {
  companies: [],
  visitors: [],
  loading: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchCompanyThunk.fulfilled,
      (state, action: PayloadAction<ICompany[]>) => {
        state.companies = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchCompanyThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanyThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchVisitorsThunk.fulfilled,
      (state, action: PayloadAction<IVisitor[]>) => {
        state.visitors = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchVisitorsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVisitorsThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
