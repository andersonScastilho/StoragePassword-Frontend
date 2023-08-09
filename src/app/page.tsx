import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { HeaderComponent } from "@/components/header/header-component";

export default function Home() {
  return (
    <main className="min-h-screen min-w-full flex flex-col gap-1">
      <HeaderComponent />
      <SideBarComponent />
    </main>
  );
}
