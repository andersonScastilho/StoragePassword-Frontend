"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardComponent } from "@/components/card/card-component";
import { HeaderComponent } from "@/components/header/header-component";

export default function Storage() {
  return (
    <main className="min-h-screen min-w-full flex flex-col gap-1">
      <HeaderComponent />
      <section className="flex-grow flex gap-10">
        <SideBarComponent />
        <div className="flex flex-wrap gap-3">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </section>
    </main>
  );
}
