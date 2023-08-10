import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../types/user.types";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginData) => {
    const teste = {
      body: {
        email: email,
        password: password,
      },
    };
    const data = await axios.post("http://localhost:3002/auth", teste);

    return data;
  }
);

interface InitialState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
