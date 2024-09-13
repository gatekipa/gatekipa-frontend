import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface IUserSettings {
  id: string;
  isMultiFactorAuthEnabled: boolean;
  multiFactorAuthMediums: string[];
}

const fetchUserSettingsThunk: AsyncThunk<IUserSettings, void, {}> =
  createAsyncThunk("userSettings/", async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/user-settings`,
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

export { fetchUserSettingsThunk };
