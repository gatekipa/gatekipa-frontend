import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
// import { IBaseResponse } from "../auth/thunk";
// import NetworkManager from "@/api";
import axios, { AxiosError } from 'axios';
import { IVisitorForm } from '@/components/features/visitors/toolbar';
import { IVisitForm } from '@/components/features/visits/toolbar';
import { ICompanyRegistration } from '@/components/features/auth/companyRegistrationForm';

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
  employee: {
    emailAddress: string;
    firstName: string;
    lastName: string;
    mobileNo: string;
    id: string;
  };
  checkInTime: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  checkoutTime: string;
  visitDate: string | null;
  id: string;
}

export interface FetchVisitorsParams {
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

const fetchCompanyThunk: AsyncThunk<ICompany[], void, {}> = createAsyncThunk(
  'company/',
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
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const fetchVisitorsThunk: AsyncThunk<IVisitor[], FetchVisitorsParams, {}> =
  createAsyncThunk('company/visitors', async (params, thunkAPI) => {
    try {
      // const response = await NetworkManager.get<IBaseResponse<IVisitor[]>>(
      //   `/visitor`
      // );

      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/visitor?${queryParams.toString()}`,
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

const addVisitorThunk: AsyncThunk<IVisitor, IVisitorForm, {}> =
  createAsyncThunk(
    'company/visitors/create',
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
          return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
      }
    }
  );

const registerCompanyThunk: AsyncThunk<any, ICompanyRegistration, {}> =
  createAsyncThunk(
    'company/register',
    async (payload: ICompanyRegistration, thunkAPI) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/company`,
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
          return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
      }
    }
  );

const fetchVisitsThunk: AsyncThunk<IVisit[], { visitorId: string }, {}> =
  createAsyncThunk('company/visits', async ({ visitorId }, thunkAPI) => {
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
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  });

const addNewVisitThunk: AsyncThunk<
  IVisit,
  { visitorId: string; payload: IVisitForm },
  {}
> = createAsyncThunk(
  'company/visits/create',
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
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const markVisitThunk: AsyncThunk<any, { visitId: string }, {}> =
  createAsyncThunk('company/visits/mark', async ({ visitId }, thunkAPI) => {
    try {
      // const response = await NetworkManager.post<IBaseResponse<any>, any>(
      //   `/visits/checkin/${visitId}`,
      //   {}
      // );

      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/visits/checkin/${visitId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return visitId;
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

const markVisitCheckoutThunk: AsyncThunk<any, { visitId: string }, {}> =
  createAsyncThunk(
    'company/visits/mark/checkout',
    async ({ visitId }, thunkAPI) => {
      try {
        // const response = await NetworkManager.post<IBaseResponse<any>, any>(
        //   `/visits/checkout/${visitId}`,
        //   {}
        // );

        await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/visits/checkout/${visitId}`,
          {},
          {
            withCredentials: true,
          }
        );
        return visitId;
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

export {
  fetchCompanyThunk,
  fetchVisitorsThunk,
  addVisitorThunk,
  fetchVisitsThunk,
  addNewVisitThunk,
  markVisitThunk,
  markVisitCheckoutThunk,
  registerCompanyThunk,
};
