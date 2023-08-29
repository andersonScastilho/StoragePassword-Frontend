"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import CustomButton from "@/components/custom-button/custom-button-comonent";
import CustomInput from "@/components/custom-input/custom-input-component";
import { CustomLabelCompoent } from "@/components/custom-label/custom-label-component";
import { HeaderComponent } from "@/components/header/header-component";
import { InputErrorMessage } from "@/components/input-error-message/input-error-message";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import axios from "axios";
import { useForm } from "react-hook-form";
interface CreateStorageProps {
  usageLocation: string;
  account: string;
  password: string;
  description?: string;
  link?: string;
}
export default function CreateStoragePage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateStorageProps>();

  const handleSubmitPress = async (data: CreateStorageProps) => {
    const { token } = await checkIsAuthenticated();

    const response = await axios.post(
      "http://localhost:3002/storages",
      {
        usageLocation: data.description,
        account: data.account,
        password: data.password,
        description: data.description,
        link: data.link,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <main className="min-h-screen min-w-full flex flex-col gap-1">
      <HeaderComponent />
      <div className="flex-grow flex gap-10 ">
        <SideBarComponent />
        <div className="bg-destaque w-96 border rounded-md border-destaque-secundario p-3 flex flex-col gap-3">
          <div>
            <CustomLabelCompoent>Local de uso</CustomLabelCompoent>
            <CustomInput {...register("usageLocation", { required: true })} />
            {errors.usageLocation?.type === "required" && (
              <InputErrorMessage>Local de uso é obrigatório</InputErrorMessage>
            )}
          </div>
          <div>
            <CustomLabelCompoent>Username/email</CustomLabelCompoent>
            <CustomInput {...register("account", { required: true })} />
            {errors.account?.type === "required" && (
              <InputErrorMessage>
                Username/email é obrigatório
              </InputErrorMessage>
            )}
          </div>
          <div>
            <CustomLabelCompoent>Senha</CustomLabelCompoent>
            <CustomInput {...register("password", { required: true })} />{" "}
            {errors.password?.type === "required" && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}
          </div>
          <div>
            <CustomLabelCompoent>Link</CustomLabelCompoent>
            <CustomInput {...register("link")} />
          </div>
          <div>
            <CustomLabelCompoent>Description</CustomLabelCompoent>
            <CustomInput {...register("description")} />
          </div>
          <CustomButton onClick={() => handleSubmit(handleSubmitPress)()}>
            Salvar
          </CustomButton>
        </div>
      </div>
    </main>
  );
}
