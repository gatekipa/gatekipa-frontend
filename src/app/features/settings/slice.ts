import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserSettingsThunk, IUserSettings } from "./thunk";

enum UserSettingsApiEndpoint {
  FETCH_SETTINGS = "FETCH_SETTINGS",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
}

export interface SettingsState {
  userSettings: IUserSettings | null;
  isLoading: { [key in UserSettingsApiEndpoint]: boolean };
}

const initialState: SettingsState = {
  userSettings: null,
  isLoading: {
    [UserSettingsApiEndpoint.FETCH_SETTINGS]: false,
    [UserSettingsApiEndpoint.CHANGE_SETTINGS]: false,
  },
};

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserSettingsThunk.pending, (state) => {
        state.isLoading[UserSettingsApiEndpoint.FETCH_SETTINGS] = true;
      })
      .addCase(
        fetchUserSettingsThunk.fulfilled,
        (state, action: PayloadAction<IUserSettings>) => {
          state.userSettings = action.payload;
          state.isLoading[UserSettingsApiEndpoint.FETCH_SETTINGS] = false;
        }
      )
      .addCase(fetchUserSettingsThunk.rejected, (state) => {
        state.isLoading[UserSettingsApiEndpoint.FETCH_SETTINGS] = false;
      });
  },
});

export default settingSlice.reducer;
