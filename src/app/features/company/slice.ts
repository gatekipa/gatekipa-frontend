import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ICompany,
  IVisit,
  IVisitor,
  addNewVisitThunk,
  addVisitorThunk,
  fetchCompanyThunk,
  fetchVisitorsThunk,
  fetchVisitsThunk,
  markVisitCheckoutThunk,
  markVisitThunk,
  registerCompanyThunk,
} from './thunk';

export interface CompanyState {
  companies: ICompany[];
  visitors: IVisitor[];
  visits: IVisit[];
  loading: boolean;
}

const initialState: CompanyState = {
  companies: [],
  visitors: [],
  visits: [],
  loading: false,
};

export const companySlice = createSlice({
  name: 'company',
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
    builder.addCase(
      addVisitorThunk.fulfilled,
      (state, action: PayloadAction<IVisitor>) => {
        state.visitors = [...state.visitors, action.payload];
        state.loading = false;
      }
    );
    builder.addCase(addVisitorThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVisitorThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      registerCompanyThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log('action.payload :>> ', action.payload);
        state.loading = false;
      }
    );
    builder.addCase(registerCompanyThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerCompanyThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchVisitsThunk.fulfilled,
      (state, action: PayloadAction<IVisit[]>) => {
        state.visits = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchVisitsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVisitsThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      addNewVisitThunk.fulfilled,
      (state, action: PayloadAction<IVisit>) => {
        state.visits = [action.payload, ...state.visits];
        state.loading = false;
      }
    );
    builder.addCase(addNewVisitThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewVisitThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      markVisitThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const index = state.visits.findIndex(
          (visit) => visit.id === action.payload
        );
        if (index !== -1) {
          state.visits[index].checkInTime = new Date().toISOString();
        }
      }
    );
    builder.addCase(markVisitThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markVisitThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      markVisitCheckoutThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const index = state.visits.findIndex(
          (visit) => visit.id === action.payload
        );
        if (index !== -1) {
          state.visits[index].checkoutTime = new Date().toISOString();
        }
      }
    );
    builder.addCase(markVisitCheckoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markVisitCheckoutThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
