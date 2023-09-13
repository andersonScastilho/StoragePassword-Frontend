import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export default userSlice.reducer;
