"use client";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  createStorageAsync,
  fetchStoragesAsync,
} from "../../store/toolkit/storage/storage.slice";
import { ResponseCreateStorageAsyncReducer } from "@/types/storage.types";
import { useAppSelector } from "@/hooks/redux.hooks";
enum TYPEINPUTPASSWORD {
  "TEXT" = "text",
  "PASSWORD" = "password",
}

interface CreateStorageProps {
  usageLocation: string;
  account: string;
  password: string;
  description?: string;
  link?: string;
}
export default function CreateStoragePage() {
  const { push } = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { storages } = useAppSelector((state) => state.storageReducer);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CreateStorageProps>();

  const [passwordIsHide, setPasswordIsHide] = useState(
    TYPEINPUTPASSWORD.PASSWORD
  );

  useEffect(() => {
    if (storages.length == 0) {
      dispatch(fetchStoragesAsync() as any);
    }
  }, []);

  const handleChangePasswordIsHide = () => {
    if (passwordIsHide === TYPEINPUTPASSWORD.PASSWORD) {
      setPasswordIsHide(TYPEINPUTPASSWORD.TEXT);
    } else {
      setPasswordIsHide(TYPEINPUTPASSWORD.PASSWORD);
    }
  };

  const handleSubmitPress = async (data: CreateStorageProps) => {
    const response: ResponseCreateStorageAsyncReducer = await dispatch(
      createStorageAsync({
        props: {
          description: data.description,
          account: data.account,
          link: data.link,
          password: data.password,
          usageLocation: data.usageLocation,
        },
      }) as any
    );

    if (response.error) {
      return toast({
        title: "Falha ao criar storage",
        description: response.error.message,
      });
    }

    toast({
      title: "Storage salvo com sucesso",
      description: "Agora você pode esquecer mais uma senha rsrs",
      action: (
        <ToastAction
          altText="Visualizar"
          onClick={() =>
            push(
              `/storage/card-details/${response?.payload?.storage.props.storageId}`
            )
          }
        >
          Visualizar
        </ToastAction>
      ),
    });

    for (const key in data) {
      resetField<any>(key);
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
                    type={passwordIsHide}
                    {...register("password", { required: true })}
                  />
                  <button className="mr-5">
                    <HiEye
                      cursor={"pointer"}
                      onClick={() => handleChangePasswordIsHide()}
                    />
                  </button>
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
