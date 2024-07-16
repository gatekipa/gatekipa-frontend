import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployeesThunk, IEmployee } from "./thunk";

export interface EmployeeState {
  employees: IEmployee[];
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchEmployeesThunk.fulfilled,
      (state, action: PayloadAction<IEmployee[]>) => {
        state.employees = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchEmployeesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeesThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default employeeSlice.reducer;
