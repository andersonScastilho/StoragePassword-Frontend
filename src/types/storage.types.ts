export interface Storage {
  props: {
    password: string;
    account: string;
    usageLocation: string;
    description?: string;
    link?: string;
    userId: string;
    storageId: string;
  };
}

export interface ResponseFetchStorages {
  data: {
    storages: Storage[];
  };
}

export interface ResponseCreateStorageAsyncReducer {
  error?: {
    message: string;
  };
  payload?: {
    storage: Storage;
  };
}

export interface ResponseDeleteStorageAsyncReducer {
  error?: {
    message: string;
  };
  payload?: {
    deleted: boolean;
  };
}

export interface ResponseFetchStoragePerIdAsyncReducer {
  error?: {
    message: string;
  };
  payload?: {
    storage: Storage;
  };
}

export interface ResponseShowEncryptedPasswordAsyncReducer {
  error?: {
    message: string;
  };
  payload?: {
    decryptedPassword: string;
  };
}
