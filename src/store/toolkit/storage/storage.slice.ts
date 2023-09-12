import { findCookie } from "@/functions/cookies";
import { Storage } from "@/types/storage.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    `${process.env.NEXT_PUBLIC_API_URL}/storages`,
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
  reducers: {
    deleteStorage: (state, action) => {
      state.storage = state.storage.filter(
        (storage) => storage.props.storageId !== action.payload
      );
    },
    createStorage: (state, action: PayloadAction<Storage>) => {
      const storage = action.payload;
      state.storage = [...state.storage, storage];
    },
  },
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

export const { deleteStorage, createStorage } = storageSlice.actions;
export default storageSlice.reducer;
