import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { saveCookie } from "../../../functions/cookies";
import { Auth } from "@/types/auth.types";

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
    const expirationDate = new Date();

    saveCookie("token", data.data.token, expirationDate.getMinutes() + 15);
    saveCookie(
      "refreshToken",
      data.data.refreshToken,
      expirationDate.getDay() + 7
    );
    saveCookie("isAuthenticated", true, expirationDate.getMinutes() + 15);

    return { token: data.data.token, refreshToken: data.data.refreshToken };
  }
);

interface InitialState {
  refreshToken: object;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: InitialState = {
  token: null,
  refreshToken: {},
  isAuthenticated: false,
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
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(loginUserAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
