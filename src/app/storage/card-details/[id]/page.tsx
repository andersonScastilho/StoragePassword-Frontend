"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardDetailStorageComponent } from "@/components/card-details-storage/card-details-storage";
import { HeaderComponent } from "@/components/header/header-component";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { useAppSelector } from "@/hooks/redux.hooks";
import { fetchStorageAsync } from "@/store/toolkit/storage/storage.slice";
import { Storage } from "@/types/storage.types";

export default function CardDetailStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const { storage: storedStorages } = useAppSelector(
    (state) => state.storageReducer
  );

  useEffect(() => {
    const fetchStorageData = async () => {
      const { token } = await checkIsAuthenticated();
      try {
        const response = await axios.get(
          `http://localhost:3002/storages/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data;

        setSelectedStorage({
          props: {
            account: responseData.account,
            description: responseData.description,
            link: responseData.link,
            password: responseData.password,
            storageId: responseData.storageId,
            usageLocation: responseData.usageLocation,
            userId: responseData.userId,
          },
        });
      } catch (error) {
        console.error("Error fetching storage:", error);
      }
    };

    const [filteredStorage] = storedStorages.filter(
      (item) => item.props.storageId === params.id
    );

    if (storedStorages.length <= 0) {
      fetchStorageData();
    } else {
      setSelectedStorage(filteredStorage);
    }
  }, [params.id]);

  return (
    <main className="min-h-screen min-w-full flex flex-col">
      <HeaderComponent />
      <div className="flex flex-grow gap-10">
        <SideBarComponent />
        {selectedStorage && (
          <CardDetailStorageComponent props={selectedStorage.props} />
        )}
      </div>
    </main>
  );
}
