"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchStoragesAsync } from "@/store/toolkit/storage/storage.slice";
import { CardStorageComponent } from "../card-preview-storage/card-preview-storage-component";

export const StorageCardsComponent = () => {
  const dispatch = useDispatch();
  const { storages } = useAppSelector((state) => state.storageReducer);

  useEffect(() => {
    if (storages.length === 0) {
      dispatch(fetchStoragesAsync() as any);
    }
  }, []);

  return (
    <div className="flex p-1 flex-wrap gap-5">
      {storages.map((storage) => (
        <CardStorageComponent
          props={storage.props}
          key={storage.props.storageId}
        />
      ))}
    </div>
  );
};
