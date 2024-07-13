import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { IBaseResponse } from "../auth/thunk";
import NetworkManager from "@/api";
import { AxiosError } from "axios";

export interface ICompany {
  id: string;
  name: string;
  emailAddress: string;
  companyCode: string;
}
export interface IVisitor {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  isActive: boolean;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const fetchCompanyThunk: AsyncThunk<ICompany[], void, {}> = createAsyncThunk(
  "company/",
  async (_, thunkAPI) => {
    try {
      const response = await NetworkManager.get<IBaseResponse<ICompany[]>>(
        `/company`
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

const fetchVisitorsThunk: AsyncThunk<IVisitor[], void, {}> = createAsyncThunk(
  "company/visitors",
  async (_, thunkAPI) => {
    try {
      const response = await NetworkManager.get<IBaseResponse<IVisitor[]>>(
        `/visitor`
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

export { fetchCompanyThunk, fetchVisitorsThunk };
