"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardDetailStorageComponent } from "@/components/card-details-storage/card-details-storage";
import { HeaderComponent } from "@/components/header/header-component";
import { useAppSelector } from "@/hooks/redux.hooks";
import { fetchStorageAsync } from "@/store/toolkit/storage/storage.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function CardDetailStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const [storagePerId, setStoragePerId] = useState();
  const { storage } = useAppSelector((state) => state.storageReducer);

  return (
    <main className="min-h-screen min-w-full flex flex-col">
      <HeaderComponent />
      <div className="flex flex-grow gap-10">
        <SideBarComponent />
        <CardDetailStorageComponent />
      </div>
    </main>
  );
}
