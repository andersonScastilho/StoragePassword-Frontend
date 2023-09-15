import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { deleteCookie, saveCookie } from "@/functions/cookies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password, rememberMe }: LoginData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        {
          email: email,
          password: password,
        }
      );

      const maxAgeInSeconds15minutos = 900;
      const maxAgeInSeconds7dias = 604800;

      await saveCookie("token", response.data.token, maxAgeInSeconds15minutos);

      if (rememberMe === true) {
        await saveCookie(
          "refreshToken",
          response.data.refreshToken,
          maxAgeInSeconds7dias
        );
      }
      return { isAuthenticated: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const loginRefreshToken = createAsyncThunk(
  "user/refreshToken",
  async () => {
    try {
      const { refreshToken } = await checkIsAuthenticated();

      if (!refreshToken) {
        throw Error("Refresh token is required");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
        {
          refresh_token: refreshToken.id,
        }
      );

      const maxAgeInSeconds15minutos = 900;

      await saveCookie("token", response.data.token, maxAgeInSeconds15minutos);

      return { isAuthenticated: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  await deleteCookie("token");
  await deleteCookie("refreshToken");
});
interface SignupUserProps {
  email: string;
  fullName: string;
  password: string;
}

export const createUserAsync = createAsyncThunk(
  "user/signUp",
  async (props: SignupUserProps) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          fullName: props.fullName,
          email: props.email,
          password: props.password,
        }
      );
      return { created: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const verifyEmailUserAsync = createAsyncThunk(
  "user/verifyEmail",
  async (email: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email`,
        {
          email: email,
        }
      );

      return { isVerifiedEmail: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const validateEmailAsync = createAsyncThunk(
  "user/validateEmail",
  async (token: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/validate-email?token=${token}`
      );

      return { emailIsValid: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "user/forgotPassword",
  async (email: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          email: email,
        }
      );
      return { sendedEmail: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

interface ResetPasswordProps {
  token: string;
  newPassword: string;
}

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async ({ newPassword, token }: ResetPasswordProps) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${token}`,
        {
          newPassword: newPassword,
        }
      );

      return { resetedPassword: true };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);
interface InitialState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createUserAsync.rejected, (state) => {
      state.isLoading = false;
    });

    //------------------------------------------------------------------------------\\

    builder.addCase(verifyEmailUserAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(verifyEmailUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(verifyEmailUserAsync.rejected, (state) => {
      state.isLoading = false;
    });

    //------------------------------------------------------------------------------\\

    builder.addCase(validateEmailAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(validateEmailAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(validateEmailAsync.rejected, (state) => {
      state.isLoading = false;
    });

    //------------------------------------------------------------------------------\\

    builder.addCase(forgotPasswordAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(forgotPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPasswordAsync.rejected, (state) => {
      state.isLoading = false;
    });

    //------------------------------------------------------------------------------\\

    builder.addCase(resetPasswordAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPasswordAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    //------------------------------------------------------------------------------\\

    builder.addCase(loginUserAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = false;
    });
    builder.addCase(loginUserAsync.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });

    //---------------------------------------------------------------------------------------------//

    builder.addCase(logoutUserAsync.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    });

    builder.addCase(logoutUserAsync.rejected, (state) => {
      state.isLoading = false;
    });

    //---------------------------------------------------------------------------------------------//

    builder.addCase(loginRefreshToken.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginRefreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
    });

    builder.addCase(loginRefreshToken.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });
  },
});
export const { updateIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;
