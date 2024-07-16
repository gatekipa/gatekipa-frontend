import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IBaseResponse,
  IUser,
  changePasswordThunk,
  forgotPasswordThunk,
  loginThunk,
  registerUserThunk,
  updatePasswordThunk,
  verifyTokenThunk,
} from "./thunk";

export interface AuthState {
  user?: IUser | null;
  loading: boolean;
  forgotPasswordUserEmail?: string | null;
  resetPasswordCredentials: { token: string; email: string };
}

const initialState: AuthState = {
  user: null,
  loading: false,
  resetPasswordCredentials: { token: "", email: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setForgotPasswordUserEmail: (state, action: PayloadAction<string>) => {
      state.forgotPasswordUserEmail = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.loading = false;
      }
    );
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      registerUserThunk.fulfilled,
      (state, action: PayloadAction<IBaseResponse<IUser>>) => {
        state.user = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(registerUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePasswordThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(
      verifyTokenThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log("action.payload :>> ", action.payload);
        state.resetPasswordCredentials.email = action.payload.data.domain ?? "";
        state.resetPasswordCredentials.token = action.payload.data.token ?? "";
      }
    );
    builder.addCase(verifyTokenThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyTokenThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePasswordThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout, setForgotPasswordUserEmail } = authSlice.actions;

export default authSlice.reducer;
