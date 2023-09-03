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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CreateStorageProps>();

  const { toast } = useToast();
  const handleSubmitPress = async (data: CreateStorageProps) => {
    try {
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

      toast({
        title: "Storage salvo com sucesso",
        description: "Agora você pode esquecer mais uma senha rsrs",
        action: (
          <ToastAction
            altText="Visualizar"
            onClick={() =>
              push(`/storage/card-details/${response.data.props.storageId}`)
            }
          >
            Visualizar
          </ToastAction>
        ),
      });

      for (const key in data) {
        resetField<any>(key);
      }
    } catch (error: any) {
      toast({
        title: "Não foi possivel armazenar o storage.",
        description: `${error.response.data.error}`,
      });
    }
  };
  return (
    <main className="h-full min-w-full flex flex-col gap-1 bg-primary ">
      <HeaderComponent />
      <div className="flex gap-10 p-5 ">
        <Card className="bg-primary-foreground border-none w-96 m-auto">
          <CardHeader>
            <CardTitle>Criar storage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div>
              <div className="flex gap-3 items-center w-full ">
                <Label className="text-[0.8rem]">Local de uso:</Label>
                <Input
                  className="outline-none text-[0.8rem] text-red-800 font-semibold"
                  {...register("usageLocation", { required: true })}
                />
              </div>
              {errors?.usageLocation?.type === "required" && (
                <InputErrorMessage>
                  Local de uso é obrigatório
                </InputErrorMessage>
              )}
            </div>

            <div>
              <div className="flex gap-3 items-center w-full">
                <Label className="text-[0.8rem]">Username:</Label>
                <Input
                  className="outline-none text-[0.8rem] text-red-800 font-semibold"
                  {...register("account", { required: true })}
                />
              </div>
              {errors?.account?.type === "required" && (
                <InputErrorMessage>Username é obrigatório</InputErrorMessage>
              )}
            </div>

            <div>
              <div className="flex gap-3 items-center w-full">
                <Label className="text-[0.8rem]">Senha:</Label>
                <div className="flex items-center gap-2 border rounded-md w-full">
                  <Input
                    className="outline-none text-[0.8rem] text-red-800 font-semibold border-none"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  <span className="mr-5">
                    <HiEye cursor={"pointer"} />
                  </span>
                </div>
              </div>
              {errors?.password?.type === "required" && (
                <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
              )}
            </div>

            <div className="flex gap-3 items-center w-full">
              <Label>Link:</Label>
              <Input
                className="outline-none text-[0.8rem] text-red-800 font-semibold"
                {...register("link")}
              />
            </div>
            <div className="flex gap-3 items-center w-full">
              <Label className="text-[0.8rem]">Descrição:</Label>
              <Textarea
                className="outline-none text-red-800 font-semibold max-h-16 text-[0.8rem]"
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
