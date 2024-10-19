import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ICompany,
  ICompanyResponse,
  ICompanyUser,
  IReceptionVisitor,
  IVisit,
  IVisitor,
  addExistingReceptionVisitorThunk,
  addNewReceptionVisitorThunk,
  addNewVisitThunk,
  addVisitorThunk,
  changeCompanyUserStatusThunk,
  editCompanyByIdThunk,
  fetchCompanyByIdThunk,
  fetchCompanyThunk,
  fetchCompanyUsersThunk,
  fetchReceptionVisitorsThunk,
  fetchVisitorsThunk,
  fetchVisitsThunk,
  markVisitCheckoutThunk,
  markVisitThunk,
  registerCompanyThunk,
} from "./thunk";

enum CompanyApiEndpoint {
  FETCH_COMPANY = "FETCH_COMPANY",
  EDIT_COMPANY = "EDIT_COMPANY",
}

export interface CompanyState {
  companies: ICompany[];
  visitors: IVisitor[];
  visits: IVisit[];
  companyUsers: ICompanyUser[];
  loading: boolean;
  company: ICompanyResponse | null;
  companyUsersLoading: boolean;
  isLoading: { [key in CompanyApiEndpoint]: boolean };
  receptionVisitors: IReceptionVisitor[];
}

const initialState: CompanyState = {
  companies: [],
  visitors: [],
  visits: [],
  companyUsers: [],
  loading: false,
  company: null,
  companyUsersLoading: false,
  isLoading: {
    [CompanyApiEndpoint.FETCH_COMPANY]: false,
    [CompanyApiEndpoint.EDIT_COMPANY]: false,
  },
  receptionVisitors: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateReceptionVisitors: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.receptionVisitors.findIndex(
        (visitor) => visitor.id === action.payload.id
      );
      if (index !== -1) {
        state.receptionVisitors[index].checkoutTime = new Date().toString();
      }
    },
  },
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
      fetchReceptionVisitorsThunk.fulfilled,
      (state, action: PayloadAction<IReceptionVisitor[]>) => {
        state.receptionVisitors = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchReceptionVisitorsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReceptionVisitorsThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchCompanyUsersThunk.fulfilled,
      (state, action: PayloadAction<ICompanyUser[]>) => {
        state.companyUsers = action.payload;
        state.companyUsersLoading = false;
      }
    );
    builder.addCase(fetchCompanyUsersThunk.pending, (state) => {
      state.companyUsersLoading = true;
    });
    builder.addCase(fetchCompanyUsersThunk.rejected, (state) => {
      state.companyUsersLoading = false;
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
      editCompanyByIdThunk.fulfilled,
      (state, action: PayloadAction<ICompanyResponse>) => {
        state.company = action.payload;
        console.log("company", action.payload);
        state.isLoading[CompanyApiEndpoint.EDIT_COMPANY] = false;
        const user = JSON.parse(localStorage.getItem("userInfo")!);
        if (user?.planInfo) {
          user.planInfo.name = action.payload.name;
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
      }
    );
    builder.addCase(editCompanyByIdThunk.pending, (state) => {
      state.isLoading[CompanyApiEndpoint.EDIT_COMPANY] = true;
    });
    builder.addCase(editCompanyByIdThunk.rejected, (state) => {
      state.isLoading[CompanyApiEndpoint.EDIT_COMPANY] = true;
    });
    builder.addCase(
      fetchCompanyByIdThunk.fulfilled,
      (state, action: PayloadAction<ICompanyResponse>) => {
        state.company = action.payload;
        state.isLoading[CompanyApiEndpoint.FETCH_COMPANY] = false;
      }
    );
    builder.addCase(addExistingReceptionVisitorThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addExistingReceptionVisitorThunk.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addExistingReceptionVisitorThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.company = action.payload;
        console.log("action.payload FROM slice:>> ", action.payload);
        state.loading = false;
      }
    );
    builder.addCase(addNewReceptionVisitorThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewReceptionVisitorThunk.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addNewReceptionVisitorThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.company = action.payload;
        console.log("action.payload FROM slice:>> ", action.payload);
        state.loading = false;
      }
    );
    builder.addCase(fetchCompanyByIdThunk.pending, (state) => {
      state.isLoading[CompanyApiEndpoint.FETCH_COMPANY] = true;
    });
    builder.addCase(fetchCompanyByIdThunk.rejected, (state) => {
      state.isLoading[CompanyApiEndpoint.FETCH_COMPANY] = true;
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
    builder.addCase(registerCompanyThunk.fulfilled, (state) => {
      state.loading = false;
    });
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
    builder.addCase(
      changeCompanyUserStatusThunk.fulfilled,
      (state, action: PayloadAction<ICompanyUser>) => {
        const index = state.companyUsers.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) state.companyUsers[index] = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(changeCompanyUserStatusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeCompanyUserStatusThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { updateReceptionVisitors } = companySlice.actions;

export default companySlice.reducer;
