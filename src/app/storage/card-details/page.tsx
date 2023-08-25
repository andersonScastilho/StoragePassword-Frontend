import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardDetailStorageComponent } from "@/components/card-details-storage/card-details-storage";
import { HeaderComponent } from "@/components/header/header-component";

export default function CardDetailStoragePage() {
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
