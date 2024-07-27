import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  changeEmployeeStatusThunk,
  createEmployeeThunk,
  editEmployeeThunk,
  fetchEmployeesThunk,
  fetchShiftsThunk,
  IEmployee,
  IShift,
} from './thunk';

export interface EmployeeState {
  employees: IEmployee[];
  shifts: IShift[];
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  shifts: [],
  loading: false,
};

export const employeeSlice = createSlice({
  name: 'employee',
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
    builder.addCase(
      fetchShiftsThunk.fulfilled,
      (state, action: PayloadAction<IShift[]>) => {
        state.shifts = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchShiftsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShiftsThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      editEmployeeThunk.fulfilled,
      (state, action: PayloadAction<IEmployee>) => {
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
        state.loading = false;
      }
    );
    builder.addCase(editEmployeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editEmployeeThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      createEmployeeThunk.fulfilled,
      (state, action: PayloadAction<IEmployee>) => {
        state.employees = [action.payload, ...state.employees];
        state.loading = false;
      }
    );
    builder.addCase(createEmployeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEmployeeThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      changeEmployeeStatusThunk.fulfilled,
      (state, action: PayloadAction<IEmployee>) => {
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id
            ? { ...employee, isActive: action.payload.isActive }
            : employee
        );

        state.loading = false;
      }
    );
    builder.addCase(changeEmployeeStatusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeEmployeeStatusThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default employeeSlice.reducer;
