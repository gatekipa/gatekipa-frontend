import NetworkManager from "@/api";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IBaseResponse } from "../auth/thunk";

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

const fetchEmployeesThunk: AsyncThunk<IEmployee[], void, {}> = createAsyncThunk(
  "employee/",
  async (_, thunkAPI) => {
    try {
      const response = await NetworkManager.get<IBaseResponse<IEmployee[]>>(
        `/employee`
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
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export { fetchEmployeesThunk };
