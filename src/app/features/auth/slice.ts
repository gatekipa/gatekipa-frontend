import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IBaseResponse,
  IUser,
  changePasswordThunk,
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  registerUserThunk,
  updatePasswordThunk,
  verifyEmailThunk,
  verifyEmailWithTokenThunk,
  verifyMfaThunk,
  verifySMSThunk,
  verifySMSWithTokenThunk,
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
        localStorage.setItem("otp", JSON.stringify({ isVerified: true }));
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
        state.resetPasswordCredentials.email = action.payload.email ?? "";
        state.resetPasswordCredentials.token = action.payload.token ?? "";
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
    builder.addCase(verifySMSWithTokenThunk.fulfilled, (state) => {
      state.loading = false;
      state.registerUser.isEmailVerified = true;
    });
    builder.addCase(verifySMSWithTokenThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifySMSWithTokenThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(verifySMSThunk.fulfilled, (state) => {
      state.loading = false;
      // state.registerUser.isEmailVerified = true;
    });
    builder.addCase(verifySMSThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifySMSThunk.rejected, (state) => {
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
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("otp");
      state.registerUser = {
        isVerificationEmailSent: false,
        isEmailVerified: false,
        emailAddress: "",
      };
      state.forgotPasswordUserEmail = null;
      state.resetPasswordCredentials = { token: "", email: "" };

      state.loading = false;
    });
    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutThunk.rejected, (state) => {
      state.loading = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("otp");
      state.registerUser = {
        isVerificationEmailSent: false,
        isEmailVerified: false,
        emailAddress: "",
      };
      state.forgotPasswordUserEmail = null;
      state.resetPasswordCredentials = { token: "", email: "" };
    });
    builder.addCase(verifyMfaThunk.fulfilled, (state) => {
      state.loading = false;
      localStorage.setItem("otp", JSON.stringify({ isVerified: true }));
    });
    builder.addCase(verifyMfaThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyMfaThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout, setForgotPasswordUserEmail, resetRegisterUser } =
  authSlice.actions;

export default authSlice.reducer;
