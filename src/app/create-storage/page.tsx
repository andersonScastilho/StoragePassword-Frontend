"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardComponent } from "@/components/card/card-component";
import { HeaderComponent } from "@/components/header/header-component";
import { StyledInputComponent } from "@/components/styled-input/styled-input-component";
import { useForm } from "react-hook-form";

export default function CreateStoragePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  return (
    <div className="min-h-screen min-w-full flex flex-col gap-1">
      <HeaderComponent />
      <section className="flex-grow flex gap-10">
        <SideBarComponent />
      </section>
    </div>
  );
}
