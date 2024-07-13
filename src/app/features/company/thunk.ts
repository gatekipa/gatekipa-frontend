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

const fetchCompanyThunk: AsyncThunk<ICompany[], void, {}> = createAsyncThunk(
  "company/",
  async (_, thunkAPI) => {
    try {
      const response = await NetworkManager.get<IBaseResponse<ICompany[]>>(
        `/company`
      );

      console.log("response.data TH :>> ", response.data);
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

export { fetchCompanyThunk };
