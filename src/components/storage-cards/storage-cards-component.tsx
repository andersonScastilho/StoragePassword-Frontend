"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchStorageAsync } from "@/store/toolkit/storage/storage.slice";
import { CardStorageComponent } from "../card-preview-storage/card-preview-storage-component";

export const StorageCardsComponent = () => {
  const dispatch = useDispatch();
  const { storage } = useAppSelector((state) => state.storageReducer);

  useEffect(() => {
    if (storage.length <= 0) {
      dispatch(fetchStorageAsync() as any);
    }
  }, []);

  return (
    <div className="flex p-1 flex-wrap gap-5">
      {storage.map((storage) => (
        <CardStorageComponent
          props={storage.props}
          key={storage.props.storageId}
        />
      ))}
    </div>
  );
};
