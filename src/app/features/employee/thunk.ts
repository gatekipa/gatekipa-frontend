// import NetworkManager from "@/api";
import { ICreateEmployeeForm } from '@/components/features/employees/createEmployeeModal';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IVisitor } from '../company/thunk';
// import { IBaseResponse } from "../auth/thunk";

export interface IShift {
  id: string;
  name: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNo: string;
  companyId: string;
  isActive: boolean;
  designation: string;
  shift: IShift;
  employeeNo: string;
  dateOfBirth: Date;
  payrollPeriodEndDate: Date;
  payDate: Date;
  timesheetDueDate: Date;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeVisit {
  id: string;
  checkOutTime: string;
  checkInTime: string;
  employee: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface IEmployeeReport {
  id: string;
  checkInTime: string;
  employee: IEmployee;
}

export interface IVisitorReport {
  id: string;
  checkInTime: string;
  purposeOfVisit: string;
  checkoutTime: string;
  visitDate: string;
  createdAt: string;
  employee: Pick<
    IEmployee,
    'id' | 'firstName' | 'lastName' | 'emailAddress' | 'mobileNo'
  >;
  visitor: Pick<
    IVisitor,
    'id' | 'firstName' | 'lastName' | 'emailAddress' | 'mobileNo'
  >;
}

export interface IEmergencyEmployeeReport {
  checkOutTime: string | null;
  checkInTime: string;
  employee: Pick<
    IEmployee,
    'id' | 'firstName' | 'lastName' | 'mobileNo' | 'emailAddress'
  >;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export interface IEmergencyVisitorReport {
  id: string;
  checkOutTime: string | null;
  checkInTime: string;
  employee: Pick<
    IVisitor,
    'id' | 'firstName' | 'lastName' | 'mobileNo' | 'emailAddress'
  >;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  purposeOfVisit: string;
  visitDate: string;
}

export type IEmployeeUpdate = Omit<IEmployee, 'companyId' | 'shift'> & {
  shift: Pick<IShift, 'id'>;
};

export interface IEmployeeQuery {
  employeeNo: string;
  mobileNo: string;
  emailAddress: string;
}

const fetchEmployeesThunk: AsyncThunk<
  IEmployee[],
  Partial<IEmployeeQuery>,
  {}
> = createAsyncThunk('employee/', async (params, thunkAPI) => {
  try {
    // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
    //   `/employee`
    // );

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/employee?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.message
    ) {
      return thunkAPI.rejectWithValue(axiosError.response.data.message);
    } else {
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
});

const createEmployeeThunk: AsyncThunk<IEmployee, ICreateEmployeeForm, {}> =
  createAsyncThunk('employee/create/', async (body, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/employee`,
        body,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const employeeCheckInThunk: AsyncThunk<
  IEmployeeVisit,
  { employeeId: string },
  {}
> = createAsyncThunk(
  'employee/visit/checkin',
  async ({ employeeId }, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/employee/checkin/${employeeId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const fetchEmergencyListByType: AsyncThunk<
  { records: IEmergencyEmployeeReport[]; type: 'employee' | 'visitor' },
  { type: 'employee' | 'visitor' },
  {}
> = createAsyncThunk('employee/emergency/list', async ({ type }, thunkAPI) => {
  try {
    // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
    //   `/employee`
    // );

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/reports/emergency-list/${type}`,
      {
        withCredentials: true,
      }
    );
    return { records: response.data.data, type };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.message
    ) {
      return thunkAPI.rejectWithValue(axiosError.response.data.message);
    } else {
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
});

const employeeCheckOutThunk: AsyncThunk<
  IEmployeeVisit,
  { employeeId: string },
  {}
> = createAsyncThunk(
  'employee/visit/checkout',
  async ({ employeeId }, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/employee/checkout/${employeeId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const sendEmergencyEmail: AsyncThunk<
  any,
  { type: string; subject: string; content: string },
  {}
> = createAsyncThunk(
  'employee/visit/checkout',
  async ({ type, subject, content }, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/reports/emergency/send-email`,
        {
          type,
          subject,
          content,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const changeEmployeeStatusThunk: AsyncThunk<IEmployee, IEmployee, {}> =
  createAsyncThunk('employee/status/', async (body, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/employee/change-status/${
          body.id
        }`,
        { status: body.isActive },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const editEmployeeThunk: AsyncThunk<IEmployee, IEmployee, {}> =
  createAsyncThunk('employee/edit/', async (body, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const requestBody = {
        ...body,
        shift: body.shift.id,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/employee/${body.id}`,
        requestBody,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const fetchShiftsThunk: AsyncThunk<IShift[], void, {}> = createAsyncThunk(
  'employee/shifts/',
  async (_, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/shift`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const fetchAllEmployeesVisits: AsyncThunk<IEmployeeReport[], void, {}> =
  createAsyncThunk('employee/visits/reports', async (_, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/reports/employee-visits`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const fetchVisitorReports: AsyncThunk<IVisitorReport[], void, {}> =
  createAsyncThunk('visitor/reports', async (_, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
      //   `/employee`
      // );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/reports/visitors-visits`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        return thunkAPI.rejectWithValue(axiosError.response.data.message);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const fetchEmployeeVisitsThunk: AsyncThunk<
  IEmployeeVisit[],
  { employeeId: string },
  {}
> = createAsyncThunk('employee/visits/', async ({ employeeId }, thunkAPI) => {
  try {
    // const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
    //   `/employee`
    // );

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/employee/visit/${employeeId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.message
    ) {
      return thunkAPI.rejectWithValue(axiosError.response.data.message);
    } else {
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
});

export {
  fetchEmployeesThunk,
  createEmployeeThunk,
  fetchShiftsThunk,
  editEmployeeThunk,
  changeEmployeeStatusThunk,
  fetchEmployeeVisitsThunk,
  employeeCheckInThunk,
  employeeCheckOutThunk,
  fetchAllEmployeesVisits,
  fetchVisitorReports,
  fetchEmergencyListByType,
  sendEmergencyEmail,
};
