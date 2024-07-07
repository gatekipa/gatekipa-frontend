import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import NetworkManager from "../../../api";
import AuthNetworkManager from "../../../api/auth";
import { IChangePasswordForm } from "../../../components/features/auth/changePasswordForm";
import { AxiosError } from "axios";

export interface IBaseResponse<T> {
  data: T;
  message: string;
  isError: boolean;
  responseCode: number;
}

export interface IUser {
  emailAddress: string;
  firstName: string;
  lastName: string;
  userType: string;
}

interface IUserRequest extends Omit<IUser, "userType"> {
  password: string;
  mobileNo: string;
}

type ILoginRequest = Pick<IUserRequest, "password" | "emailAddress">;

interface IForgotPasswordRequest {
  emailAddress: string;
}

interface IVerifyTokenRequest {
  token: string;
  email: string;
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
> = createAsyncThunk("users/register", async (userDetails: IUserRequest) => {
  const response = await NetworkManager.post<
    IBaseResponse<IUser>,
    IUserRequest
  >(`/users/signup`, userDetails);
  return response.data;
});

const loginThunk: AsyncThunk<IUser, ILoginRequest, {}> = createAsyncThunk(
  "users/login",
  async (loginDetails: ILoginRequest, thunkAPI) => {
    try {
      const response = await AuthNetworkManager.post<IUser, ILoginRequest>(
        `/users/signin`,
        loginDetails
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
        console.log("response.data :>> ", response.data);
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
};
