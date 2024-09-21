import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  changeEmployeeStatusThunk,
  createEmployeeThunk,
  createShiftThunk,
  deleteShiftThunk,
  editEmployeeThunk,
  editShiftThunk,
  employeeCheckInThunk,
  employeeCheckOutThunk,
  fetchAllEmployeesVisits,
  fetchEmergencyListByType,
  fetchEmployeesThunk,
  fetchEmployeeVisitsThunk,
  fetchShiftsThunk,
  fetchVisitorReports,
  IEmergencyEmployeeReport,
  IEmergencyVisitorReport,
  IEmployee,
  IEmployeeReport,
  IEmployeeVisit,
  IShift,
  IVisitorReport,
} from "./thunk";
import { EmergencyTab } from "@/pages/dashboard/emergency";

export interface EmployeeState {
  employees: IEmployee[];
  shifts: IShift[];
  employee: IEmployee | null;
  visits: IEmployeeVisit[];
  employeeVisits: IEmployeeReport[];
  visitorVisits: IVisitorReport[];
  emergency: {
    employee: IEmergencyEmployeeReport[];
    visitor: IEmergencyVisitorReport[];
  };
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  shifts: [],
  visits: [],
  employeeVisits: [],
  employee: null,
  visitorVisits: [],
  emergency: { employee: [], visitor: [] },
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
    builder.addCase(
      fetchEmployeeVisitsThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          employee: IEmployee;
          employeeVisits: IEmployeeVisit[];
        }>
      ) => {
        state.visits = action.payload.employeeVisits;
        state.employee = action.payload.employee;
        state.loading = false;
      }
    );
    builder.addCase(fetchEmployeeVisitsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeeVisitsThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchEmergencyListByType.fulfilled,
      (
        state,
        action: PayloadAction<{
          records: IEmergencyEmployeeReport[] | IEmergencyVisitorReport[];
          type: EmergencyTab;
        }>
      ) => {
        if (action.payload.type === EmergencyTab.EMPLOYEES) {
          state.emergency.employee = action.payload
            .records as IEmergencyEmployeeReport[];
        } else {
          state.emergency.visitor = action.payload
            .records as IEmergencyVisitorReport[];
        }
        state.loading = false;
      }
    );
    builder.addCase(fetchEmergencyListByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmergencyListByType.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchVisitorReports.fulfilled,
      (state, action: PayloadAction<IVisitorReport[]>) => {
        state.visitorVisits = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchVisitorReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVisitorReports.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      fetchAllEmployeesVisits.fulfilled,
      (state, action: PayloadAction<IEmployeeReport[]>) => {
        state.employeeVisits =
          action.payload?.filter((record) => !!record.employee) ?? [];
        state.loading = false;
      }
    );
    builder.addCase(fetchAllEmployeesVisits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllEmployeesVisits.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      employeeCheckInThunk.fulfilled,
      (state, action: PayloadAction<IEmployeeVisit>) => {
        state.visits = [action.payload, ...state.visits];
        state.loading = false;
      }
    );
    builder.addCase(employeeCheckInThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(employeeCheckInThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      employeeCheckOutThunk.fulfilled,
      (state, action: PayloadAction<IEmployeeVisit>) => {
        state.visits = [action.payload, ...state.visits];
        state.loading = false;
      }
    );
    builder.addCase(employeeCheckOutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(employeeCheckOutThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      createShiftThunk.fulfilled,
      (state, action: PayloadAction<IShift>) => {
        state.shifts = [action.payload, ...state.shifts];
        state.loading = false;
      }
    );
    builder.addCase(createShiftThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createShiftThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      editShiftThunk.fulfilled,
      (state, action: PayloadAction<IShift>) => {
        state.shifts = state.shifts.map((shift) =>
          shift.id === action.payload.id ? action.payload : shift
        );
        state.loading = false;
      }
    );
    builder.addCase(editShiftThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editShiftThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      deleteShiftThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.shifts = state.shifts.filter(
          (shift) => shift.id !== action.payload
        );
        state.loading = false;
      }
    );
    builder.addCase(deleteShiftThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteShiftThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default employeeSlice.reducer;
