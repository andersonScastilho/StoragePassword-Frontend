"use client";
import { findCookie } from "@/functions/cookies";
import { Storage } from "@/types/storage.types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "../card/card-component";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchStorageAsync } from "@/store/toolkit/storage/storage.slice";

export const StorageCardsComponent = () => {
  const dispatch = useDispatch();
  const { storage } = useAppSelector((state) => state.storageReducer);

  useEffect(() => {
    if (!storage) {
      dispatch(fetchStorageAsync() as any);
    }
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {storage.map((storage) => (
          <CardComponent props={storage.props} />
        ))}
      </div>
    </>
  );
};
