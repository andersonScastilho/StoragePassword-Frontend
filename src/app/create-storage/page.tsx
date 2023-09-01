"use client";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { HeaderComponent } from "@/components/header/header-component";
import { InputErrorMessage } from "@/components/input-error-message/input-error-message";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiEye } from "react-icons/hi";
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
      `${process.env.NEXT_PUBLIC_API_URL}/storages`,
      {
        usageLocation: data.usageLocation,
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
    <main className="min-h-screen min-w-full flex flex-col gap-1 bg-primary">
      <HeaderComponent />
      <div className="flex-grow flex gap-10 ">
        <SideBarComponent />
        <Card className="bg-primary-foreground border-none w-96 m-auto">
          <CardHeader>
            <CardTitle>Criar storage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <Label className="">Local de uso:</Label>
              <Input
                className="outline-none text-red-800 font-semibold"
                {...register("usageLocation", { required: true })}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Label className="">Username:</Label>
              <Input
                className="outline-none text-red-800 font-semibold"
                {...register("account", { required: true })}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Label className="">Senha:</Label>
              <div className="flex items-center gap-2 border rounded-md">
                <Input
                  className="outline-none text-red-800 font-semibold"
                  type="password"
                  {...register("password", { required: true })}
                />
                <span className="mr-5">
                  <HiEye cursor={"pointer"} />
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Label>Link:</Label>
              <Input
                className="outline-none text-red-800 font-semibold"
                {...register("link")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <Label className="">Description:</Label>
              <Textarea
                className="outline-none  text-red-800 font-semibold max-h-16 text-[0.8rem]"
                spellCheck={false}
                {...register("description")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleSubmit(handleSubmitPress)()}
            >
              Salvar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
