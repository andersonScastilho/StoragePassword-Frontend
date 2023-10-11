import { HeaderComponent } from "@/components/header/header-component";

export default function Home() {
  return (
    <main className="h-full min-w-full flex flex-col bg-primary">
      <HeaderComponent />
      <section className="h-full w-full flex flex-col bg-primary"></section>
    </main>
  );
}
