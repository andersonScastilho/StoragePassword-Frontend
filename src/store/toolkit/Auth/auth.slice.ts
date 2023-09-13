import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, saveCookie } from "../../../functions/cookies";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";

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

    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
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
