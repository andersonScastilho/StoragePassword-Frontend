import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deleteCookie,
  findCookie,
  saveCookie,
} from "../../../functions/cookies";
import { Auth } from "@/types/auth.types";
import { RefreshToken } from "@/types/refreshToken.types";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password, rememberMe }: LoginData) => {
    const data: Auth = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      {
        email: email,
        password: password,
      }
    );
    const maxAgeInSeconds15minutos = 900;
    const maxAgeInSeconds7dias = 604800;

    await saveCookie("token", data.data.token, maxAgeInSeconds15minutos);

    if (rememberMe === true) {
      await saveCookie(
        "refreshToken",
        data.data.refreshToken,
        maxAgeInSeconds7dias
      );
    }

    return { token: data.data.token, refreshToken: data.data.refreshToken };
  }
);

export const userRefreshToken = createAsyncThunk(
  "user/refreshToken",
  async () => {
    const cookiesRefreshToken: RefreshToken = await findCookie("refreshToken");
    const cookiesToken: string = await findCookie("token");

    if (!cookiesRefreshToken && !cookiesToken) {
      return {
        token: "",
        refreshToken: {},
        isLoading: false,
      };
    }

    if (!cookiesToken && cookiesRefreshToken) {
      const token: string = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
          refresh_token: cookiesRefreshToken.id,
        })
        .then((data) => data.data.token);

      const maxAgeInSeconds15minutos = 900;

      await saveCookie("token", token, maxAgeInSeconds15minutos);

      return {
        token: token,
        refreshToken: { ...cookiesRefreshToken },
        isLoading: false,
      };
    }

    if (cookiesToken && !cookiesRefreshToken) {
      return {
        token: cookiesToken,
        refreshToken: {},
        isLoading: false,
      };
    }

    return {
      token: cookiesToken,
      refreshToken: cookiesRefreshToken,
      isLoading: false,
    };
  }
);
export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  await deleteCookie("token");
  await deleteCookie("refreshToken");
});
interface InitialState {
  refreshToken: object;
  token: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  token: "",
  refreshToken: {},
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUserAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoading = false;
    });

    builder.addCase(loginUserAsync.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.token = initialState.token;
      state.refreshToken = initialState.refreshToken;
      state.isLoading = initialState.isLoading;
    });

    builder.addCase(userRefreshToken.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(userRefreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoading = false;
    });

    builder.addCase(userRefreshToken.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
