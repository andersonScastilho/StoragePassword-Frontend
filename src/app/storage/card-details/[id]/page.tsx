"use client";
import React, { useEffect, useState } from "react";
import { CardDetailStorageComponent } from "@/components/card-details-storage/card-details-storage";
import { HeaderComponent } from "@/components/header/header-component";
import { useAppSelector } from "@/hooks/redux.hooks";
import {
  ResponseFetchStoragePerIdAsyncReducer,
  Storage,
} from "@/types/storage.types";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import {
  fetchStoragePerIdAsync,
  fetchStoragesAsync,
} from "@/store/toolkit/storage/storage.slice";

export default function CardDetailStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const { storages } = useAppSelector((state) => state.storageReducer);

  useEffect(() => {
    const fetchStorageData = async () => {
      const response: ResponseFetchStoragePerIdAsyncReducer = await dispatch(
        fetchStoragePerIdAsync(params.id) as any
      );

      if (response.error) {
        return toast({
          title: "Falha Storage",
          description: response.error.message,
        });
      }
      return setSelectedStorage(response.payload?.storage);
    };

    if (storages.length <= 0) {
      fetchStorageData();
      dispatch(fetchStoragesAsync() as any);
    } else {
      const [filteredStorage] = storages.filter(
        (item) => item.props.storageId === params.id
      );
      setSelectedStorage(filteredStorage);
    }
  }, [params.id]);

  return (
    <main className="h-full min-w-full flex flex-col bg-primary gap-1">
      <HeaderComponent />

      <div className="flex flex-grow gap-10 p-5">
        {selectedStorage && <CardDetailStorageComponent storage={} />}
      </div>
    </main>
  );
}
