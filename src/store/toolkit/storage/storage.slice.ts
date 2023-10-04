import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import {
  PartialStorage,
  ResponseFetchStorages,
  Storage,
} from "@/types/storage.types";
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
    try {
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

      return { storages: response.data.storages };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
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

interface UpdateStorageProps {
  storageId: string;
  updateProps: PartialStorage;
}

export const updateStorageAsync = createAsyncThunk(
  "storage/update",
  async ({ storageId, updateProps }: UpdateStorageProps) => {
    try {
      const { token } = await checkIsAuthenticated();

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/storages/${storageId}`,
        { ...updateProps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const storage: Storage = response.data.storage;
      return storage;
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);

export const fetchStoragePerIdAsync = createAsyncThunk(
  "storage/fetchUnique",
  async (storageId: string) => {
    try {
      const { token } = await checkIsAuthenticated();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/storages/${storageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { ...response.data };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);
interface ShowEncryptedPasswordProps {
  storageId: string;
  password: string;
}
export const showEncryptedPasswordAsync = createAsyncThunk(
  "storage/showEncryptedPassword",
  async ({ password, storageId }: ShowEncryptedPasswordProps) => {
    try {
      const { token } = await checkIsAuthenticated();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/passwords/storages/${storageId}`,
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { decryptedPassword: response.data.descryptedPassword };
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  }
);
interface InitialState {
  storages: Storage[];
  storage: Storage;
  isLoading: boolean;
}

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
      state.storages = action?.payload?.storages || initialState.storages;
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

    builder.addCase(updateStorageAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStorageAsync.fulfilled, (state, action) => {
      const teste = state.storages.filter(
        (storage) => storage.props.storageId !== action.payload.props.storageId
      );

      teste.push(action.payload);

      state.storages = [...teste];
      state.isLoading = false;
    });
    builder.addCase(updateStorageAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default storageSlice.reducer;
