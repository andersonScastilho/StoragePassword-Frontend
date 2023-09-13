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
