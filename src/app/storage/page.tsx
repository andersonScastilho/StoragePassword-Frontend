"use client";
import { HeaderComponent } from "@/components/header/header-component";
import LoadingComponent from "@/components/loading/loading-component";
import { StorageCardsComponent } from "@/components/storage-cards/storage-cards-component";
import { useAppSelector } from "@/hooks/redux.hooks";

export default function Storage() {
  const { isLoading } = useAppSelector((state) => state.storageReducer);
  return (
    <main className="min-h-screen min-w-full bg-primary flex flex-col gap-1">
      {isLoading && <LoadingComponent />}
      <HeaderComponent />
      <section className="flex-grow flex gap-4 p-5">
        <StorageCardsComponent />
      </section>
    </main>
  );
}
