import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { ResponseFetchStorages, Storage } from "@/types/storage.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IPropsType {
  props: {
    password: string;
    account: string;
    usageLocation: string;
    description?: string;
    link?: string;
  };
}

interface InitialState {
  storages: Storage[];
  storage: Storage;
  isLoading: boolean;
}

const initialState: InitialState = {
  storages: [],
  storage: {
    props: {
      account: "",
      password: "",
      storageId: "",
      userId: "",
      description: "",
      link: "",
      usageLocation: "",
    },
  },
  isLoading: false,
};

export const deleteStorageAsync = createAsyncThunk(
  "storage/delete",
  async (storageId: string) => {
    try {
      const { token } = await checkIsAuthenticated();

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/storages/${storageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { deleted: true, storageId };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

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

export const createStorageAsync = createAsyncThunk(
  "storage/create",
  async ({ props }: IPropsType) => {
    try {
      const { token } = await checkIsAuthenticated();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/storages`,
        {
          usageLocation: props.usageLocation,
          account: props.account,
          password: props.password,
          description: props.description,
          link: props.link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw Error("Não foi possivel criar o storage");
      }

      return { storage: response.data.storage };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStoragesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoragesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storages = action?.payload?.storage || initialState.storages;
    });
    builder.addCase(fetchStoragesAsync.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createStorageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createStorageAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.storages = [...state.storages, action.payload.storage];
    });
    builder.addCase(createStorageAsync.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteStorageAsync.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteStorageAsync.fulfilled, (state, action) => {
      state.storages = state.storages.filter(
        (storage) => storage.props.storageId !== action.payload.storageId
      );
      state.isLoading = false;
    });

    builder.addCase(deleteStorageAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default storageSlice.reducer;
