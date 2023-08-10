import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginData) => {
    const data = await axios.post("http://localhost:3002/auth", {
      email: email,
      password: password,
    });
    console.log(data);
    return { token: data.data.token, refresh_token: data.data.refreshToken };
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
