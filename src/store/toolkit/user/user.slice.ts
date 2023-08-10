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

    return { token: data.data.token, refresh_token: data.data.refresh_token };
  }
);

interface InitialState {
  refresh_token: object;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  token: null,
  refresh_token: {},
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
