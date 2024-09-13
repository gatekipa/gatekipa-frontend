import { createSlice } from "@reduxjs/toolkit";

enum UserSettingsApiEndpoint {
  FETCH_SETTINGS = "FETCH_SETTINGS",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
}

export interface SettingsState {}

const initialState: SettingsState = {
  isLoading: {
    [UserSettingsApiEndpoint.FETCH_SETTINGS]: false,
    [UserSettingsApiEndpoint.CHANGE_SETTINGS]: false,
  },
};

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default settingSlice.reducer;
