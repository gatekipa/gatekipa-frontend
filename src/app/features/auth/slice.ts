import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IBaseResponse,
  IUser,
  changePasswordThunk,
  forgotPasswordThunk,
  loginThunk,
  registerUserThunk,
  updatePasswordThunk,
  verifyEmailThunk,
  verifyEmailWithTokenThunk,
  verifyTokenThunk,
} from "./thunk";

export interface AuthState {
  user?: IUser | null;
  loading: boolean;
  forgotPasswordUserEmail?: string | null;
  resetPasswordCredentials: { token: string; email: string };
  registerUser: {
    isVerificationEmailSent: boolean;
    isEmailVerified: boolean;
    emailAddress: string;
  };
}

const initialState: AuthState = {
  user: null,
  loading: false,
  resetPasswordCredentials: { token: "", email: "" },
  registerUser: {
    isVerificationEmailSent: false,
    isEmailVerified: false,
    emailAddress: "",
  },
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
    resetRegisterUser: (state) => {
      state.registerUser = {
        isVerificationEmailSent: false,
        isEmailVerified: false,
        emailAddress: "",
      };
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
        state.registerUser = {
          isVerificationEmailSent: false,
          isEmailVerified: false,
          emailAddress: "",
        };
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
    builder.addCase(
      verifyEmailThunk.fulfilled,
      (state, action: PayloadAction<{ emailAddress: string }>) => {
        state.loading = false;
        state.registerUser.isVerificationEmailSent = true;
        state.registerUser.emailAddress = action.payload.emailAddress ?? "";
      }
    );
    builder.addCase(verifyEmailThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyEmailThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyEmailWithTokenThunk.fulfilled, (state) => {
      state.loading = false;
      state.registerUser.isEmailVerified = true;
    });
    builder.addCase(verifyEmailWithTokenThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyEmailWithTokenThunk.rejected, (state) => {
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

export const { logout, setForgotPasswordUserEmail, resetRegisterUser } =
  authSlice.actions;

export default authSlice.reducer;
