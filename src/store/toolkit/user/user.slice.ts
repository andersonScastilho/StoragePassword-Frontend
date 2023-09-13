import { UserType } from "@/types/userType";
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

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export default userSlice.reducer;
