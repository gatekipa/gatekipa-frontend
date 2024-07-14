import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { IBaseResponse } from "../auth/thunk";
import NetworkManager from "@/api";
import { AxiosError } from "axios";
import { IVisitorForm } from "@/components/features/visitors/toolbar";

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

export interface IVisit {
  visitorId: string;
  employeeId: string | null;
  purposeOfVisit: string;
  personToMeet: string;
  personToMeetMobileNo: string;
  personToMeetEmail: string;
  checkInTime: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  checkoutTime: string;
  id: string;
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

const addVisitorThunk: AsyncThunk<IVisitor, IVisitorForm, {}> =
  createAsyncThunk(
    "company/visitors/create",
    async (payload: IVisitorForm, thunkAPI) => {
      try {
        const response = await NetworkManager.post<
          IBaseResponse<IVisitor>,
          IVisitorForm
        >(`/visitor/create`, payload);
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

const fetchVisitsThunk: AsyncThunk<IVisit[], { visitorId: string }, {}> =
  createAsyncThunk("company/visits", async ({ visitorId }, thunkAPI) => {
    try {
      const response = await NetworkManager.get<IBaseResponse<IVisit[]>>(
        `/visits/${visitorId}`
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
  });

export {
  fetchCompanyThunk,
  fetchVisitorsThunk,
  addVisitorThunk,
  fetchVisitsThunk,
};
