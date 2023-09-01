"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { HeaderComponent } from "@/components/header/header-component";
import { StorageCardsComponent } from "@/components/storage-cards/storage-cards-component";

export default function Storage() {
  return (
    <main className="min-h-screen min-w-full bg-primary flex flex-col gap-1">
      <HeaderComponent />
      <section className="flex-grow flex gap-4">
        <SideBarComponent />
        <StorageCardsComponent />
      </section>
    </main>
  );
}
