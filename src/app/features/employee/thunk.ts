// import NetworkManager from "@/api";
import { ICreateEmployeeForm } from '@/components/features/employees/createEmployeeModal';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// import { IBaseResponse } from "../auth/thunk";

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNo: string;
  companyId: string;
  isActive: boolean;
  designation: string;
  employeeNo: string;
  dateOfBirth: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

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

export { fetchEmployeesThunk, createEmployeeThunk };
