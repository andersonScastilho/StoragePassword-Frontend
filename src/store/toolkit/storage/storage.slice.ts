import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { ResponseFetchStorages, Storage } from "@/types/storage.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStoragesAsync = createAsyncThunk(
  "storage/fetch",
  async () => {
    const { token } = await checkIsAuthenticated();

    if (!token) {
      return;
    }

    const response: ResponseFetchStorages = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/storages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { storage: response.data.storages };
  }
);

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
    builder.addCase(fetchStoragesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoragesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storage = action?.payload?.storage || initialState.storage;
    });
    builder.addCase(fetchStoragesAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { deleteStorage, createStorage } = storageSlice.actions;
export default storageSlice.reducer;
