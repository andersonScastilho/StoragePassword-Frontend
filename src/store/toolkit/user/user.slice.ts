import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { findCookie, saveCookie } from "../../../functions/cookies";
import { Auth } from "@/types/auth.types";
import { RefreshToken } from "@/types/refreshToken.types";

interface LoginData {
  email: string;
  password: string;
}

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginData) => {
    const data: Auth = await axios.post("http://localhost:3002/auth", {
      email: email,
      password: password,
    });
    const maxAgeInSeconds15minutos = 900;
    const maxAgeInSeconds7dias = 604800;

    await saveCookie("token", data.data.token, maxAgeInSeconds15minutos);
    await saveCookie(
      "refreshToken",
      data.data.refreshToken,
      maxAgeInSeconds7dias
    );

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
        .post("http://localhost:3002/refresh-token", {
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
