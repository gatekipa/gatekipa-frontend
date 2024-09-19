import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import NetworkManager from "../../../api";
//import AuthNetworkManager from "../../../api/auth";
import { IChangePasswordForm } from "../../../components/features/auth/changePasswordForm";
import axios, { AxiosError } from "axios";

export interface IBaseResponse<T> {
  data: T;
  message: string;
  isError: boolean;
  responseCode: number;
}

export interface IUserPlan {
  id: string;
  emailAddress: string;
  name: string;
  ownerFirstName: string;
  ownerLastName: string;
  mobileNo: string;
  isSubscriptionActive: boolean;
  nextPaymentDate: string;
  lastPaymentDate: string;
  stripeCustomerId: string;
  companyCode: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  plan: {
    id: string;
    planName: string;
  };
}

export interface IUser {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  userType: string;
  visitorId: string | null;
  companyId: string | null;
  planInfo: IUserPlan | null;
  employeeId: string | null;
  isMultiFactorAuthEnabled?: boolean;
  multiFactorAuthMediums?: string[];
}

interface IUserRequest
  extends Omit<
    IUser,
    "userType" | "id" | "visitorId" | "employeeId" | "planInfo"
  > {
  password: string;
  mobileNo: string;
  isEmailVerified: boolean;
}

type ILoginRequest = Pick<IUserRequest, "password" | "emailAddress">;

interface IForgotPasswordRequest {
  emailAddress: string;
}

interface IVerifyTokenRequest {
  token: string;
  email: string;
}
interface IVerifyEmailWithTokenRequest {
  token: string;
  emailAddress: string;
}

interface IVerifySMSWithTokenRequest {
  token: string;
  mobileNo: string;
}

interface IVerifyEmailRequest {
  emailAddress: string;
  forSignUp?: boolean;
}

interface IVerifySMSTokenRequest {
  mobileNo: string;
  forSignUp?: boolean;
}

interface IUpdatePasswordRequest {
  token: string;
  emailAddress: string;
  newPassword: string;
}

const registerUserThunk: AsyncThunk<
  IBaseResponse<IUser>,
  IUserRequest,
  {}
> = createAsyncThunk(
  "users/register",
  async (userDetails: IUserRequest, thunkAPI) => {
    try {
      const response = await NetworkManager.post<
        IBaseResponse<IUser>,
        IUserRequest
      >(`/users/signup`, userDetails);
      return response.data;
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

const loginThunk: AsyncThunk<IUser, ILoginRequest, {}> = createAsyncThunk(
  "users/login",
  async (loginDetails: ILoginRequest, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/users/signin`,
        loginDetails,
        { withCredentials: true }
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

const logoutThunk: AsyncThunk<any, {}, {}> = createAsyncThunk(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/users/signout`,
        {},
        { withCredentials: true }
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

const changePasswordThunk: AsyncThunk<
  IBaseResponse<IUser>,
  IChangePasswordForm,
  {}
> = createAsyncThunk(
  "users/change-password",
  async (loginDetails: IChangePasswordForm) => {
    const response = await NetworkManager.post<
      IBaseResponse<IUser>,
      IChangePasswordForm
    >(`/users/change-password`, loginDetails);
    return response.data;
  }
);

const forgotPasswordThunk: AsyncThunk<any, IForgotPasswordRequest, {}> =
  createAsyncThunk(
    "users/forgot-password",
    async (forgotPasswordRequest: IForgotPasswordRequest, thunkAPI) => {
      try {
        const response = await NetworkManager.post<any, IForgotPasswordRequest>(
          `/users/forgot-password`,
          forgotPasswordRequest
        );
        return response.data;
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

const verifyTokenThunk: AsyncThunk<any, IVerifyTokenRequest, {}> =
  createAsyncThunk(
    "users/verify-forgot-pass-token",
    async (verifyTokenRequest: IVerifyTokenRequest, thunkAPI) => {
      try {
        const response = await NetworkManager.post<any, IVerifyTokenRequest>(
          `/users/verify-forgot-pass-token`,
          verifyTokenRequest
        );
        return response.data;
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

const verifyEmailThunk: AsyncThunk<any, IVerifyEmailRequest, {}> =
  createAsyncThunk(
    "users/verify-email",
    async (verifyEmailRequest: IVerifyEmailRequest, thunkAPI) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/users/verify-email`,
          verifyEmailRequest,
          { withCredentials: true }
        );

        return { emailAddress: verifyEmailRequest.emailAddress };
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

const verifySMSThunk: AsyncThunk<any, IVerifySMSTokenRequest, {}> =
  createAsyncThunk(
    "users/verify-sms",
    async (verifyEmailRequest: IVerifySMSTokenRequest, thunkAPI) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/users/verify-mobileno`,
          verifyEmailRequest,
          { withCredentials: true }
        );

        return { mobileNo: verifyEmailRequest.mobileNo };
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

const verifyEmailWithTokenThunk: AsyncThunk<
  any,
  IVerifyEmailWithTokenRequest,
  {}
> = createAsyncThunk(
  "users/verify-email-token",
  async (verifyEmailRequest: IVerifyEmailWithTokenRequest, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/users/verify-email-token`,
        verifyEmailRequest,
        { withCredentials: true }
      );

      return response.data;
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

const verifySMSWithTokenThunk: AsyncThunk<any, IVerifySMSWithTokenRequest, {}> =
  createAsyncThunk(
    "users/verify-sms-token",
    async (verifyEmailRequest: IVerifySMSWithTokenRequest, thunkAPI) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/users/verify-mobileno-token`,
          verifyEmailRequest,
          { withCredentials: true }
        );

        return response.data;
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

const updatePasswordThunk: AsyncThunk<any, IUpdatePasswordRequest, {}> =
  createAsyncThunk(
    "users/new-password",
    async (updatePasswordRequest: IUpdatePasswordRequest, thunkAPI) => {
      try {
        const response = await NetworkManager.post<any, IUpdatePasswordRequest>(
          `/users/new-password`,
          updatePasswordRequest
        );
        return response.data;
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
  registerUserThunk,
  loginThunk,
  changePasswordThunk,
  forgotPasswordThunk,
  verifyTokenThunk,
  updatePasswordThunk,
  verifyEmailThunk,
  verifyEmailWithTokenThunk,
  verifySMSThunk,
  verifySMSWithTokenThunk,
  logoutThunk,
};
