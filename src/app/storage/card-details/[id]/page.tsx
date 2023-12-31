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
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import {
  loginRefreshToken,
  logoutUserAsync,
} from "@/store/toolkit/user/user.slice";
import { LoginResponseType } from "@/types/auth.types";
import { useRouter } from "next/navigation";

export default function CardDetailStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const { storages } = useAppSelector((state) => state.storageReducer);
  const { push } = useRouter();

  useEffect(() => {
    const fetchStorageData = async () => {
      const { refreshToken } = await checkIsAuthenticated();
      const response: ResponseFetchStoragePerIdAsyncReducer = await dispatch(
        fetchStoragePerIdAsync(params.id) as any
      );

      if (response.error) {
        if (
          response.error.message === "Token expired or invalid" &&
          refreshToken
        ) {
          const responseLoginRefreshToken: LoginResponseType = await dispatch(
            loginRefreshToken() as any
          );
          if (responseLoginRefreshToken.payload.isAuthenticated !== true) {
            return push("/sign-in");
          }

          return setSelectedStorage(response.payload?.storage);
        }
        if (
          response.error.message === "Token expired or invalid" &&
          !refreshToken
        ) {
          await dispatch(logoutUserAsync() as any);
          return push("/sign-in");
        }

        return toast({
          title: "Exibição do storage",
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
        {selectedStorage && (
          <CardDetailStorageComponent props={selectedStorage.props} />
        )}
      </div>
    </main>
  );
}
