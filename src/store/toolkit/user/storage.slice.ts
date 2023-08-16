import { findCookie } from "@/functions/cookies";
import { Storage } from "@/types/storage.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userSlice from "./user.slice";

interface FetchStorage {
  data: {
    storages: Storage[];
  };
}

export const fetchStorageAsync = createAsyncThunk("storage/fetch", async () => {
  const cookieToken: string = await findCookie("token");

  if (!cookieToken) {
    return;
  }

  const response: FetchStorage = await axios.get(
    "http://localhost:3002/storages",
    {
      headers: {
        Authorization: `Bearer ${cookieToken}`,
      },
    }
  );

  return { storage: response.data.storages };
});

interface InitialState {
  storage: Storage[] | [];
  isLoading: boolean;
}
const initialState: InitialState = {
  storage: [],
  isLoading: false,
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStorageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStorageAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storage = action?.payload?.storage || initialState.storage;
    });
    builder.addCase(fetchStorageAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default storageSlice.reducer;
