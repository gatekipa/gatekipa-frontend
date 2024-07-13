import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICompany, fetchCompanyThunk } from "./thunk";

export interface CompanyState {
  companies: ICompany[];
  loading: boolean;
}

const initialState: CompanyState = {
  companies: [],
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
  },
});

export default companySlice.reducer;
