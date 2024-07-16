import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
// import { IBaseResponse } from "../auth/thunk";
// import NetworkManager from "@/api";
import axios, { AxiosError } from "axios";
import { IVisitorForm } from "@/components/features/visitors/toolbar";
import { IVisitForm } from "@/components/features/visits/toolbar";

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
      // const response = await NetworkManager.get<IBaseResponse<ICompany[]>>(
      //   `/company`
      // );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/company`,
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
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const fetchVisitorsThunk: AsyncThunk<IVisitor[], void, {}> = createAsyncThunk(
  "company/visitors",
  async (_, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IVisitor[]>>(
      //   `/visitor`
      // );
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/visitor`,
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
        // const response = await NetworkManager.post<
        //   IBaseResponse<IVisitor>,
        //   IVisitorForm
        // >(`/visitor/create`, payload);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/visitor/create`,
          payload,
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
          return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
      }
    }
  );

const fetchVisitsThunk: AsyncThunk<IVisit[], { visitorId: string }, {}> =
  createAsyncThunk("company/visits", async ({ visitorId }, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IVisit[]>>(
      //   `/visits/${visitorId}`
      // );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/visits/${visitorId}`,
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
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  });

const addNewVisitThunk: AsyncThunk<
  IVisit,
  { visitorId: string; payload: IVisitForm },
  {}
> = createAsyncThunk(
  "company/visits/create",
  async ({ visitorId, payload }, thunkAPI) => {
    try {
      // const response = await NetworkManager.post<
      //   IBaseResponse<IVisit>,
      //   IVisitForm
      // >(`/visits/${visitorId}`, payload);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/visits/${visitorId}`,
        payload,
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
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const markVisitThunk: AsyncThunk<any, { visitId: string }, {}> =
  createAsyncThunk("company/visits/mark", async ({ visitId }, thunkAPI) => {
    try {
      // const response = await NetworkManager.post<IBaseResponse<any>, any>(
      //   `/visits/checkin/${visitId}`,
      //   {}
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/visits/checkin/${visitId}`,
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
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  });

const markVisitCheckoutThunk: AsyncThunk<any, { visitId: string }, {}> =
  createAsyncThunk(
    "company/visits/mark/checkout",
    async ({ visitId }, thunkAPI) => {
      try {
        // const response = await NetworkManager.post<IBaseResponse<any>, any>(
        //   `/visits/checkout/${visitId}`,
        //   {}
        // );

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/visits/checkout/${visitId}}`,
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
          return thunkAPI.rejectWithValue("An unexpected error occurred");
        }
      }
    }
  );

export {
  fetchCompanyThunk,
  fetchVisitorsThunk,
  addVisitorThunk,
  fetchVisitsThunk,
  addNewVisitThunk,
  markVisitThunk,
  markVisitCheckoutThunk,
};
