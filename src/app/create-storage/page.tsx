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
import { SubmitHandler, useForm } from "react-hook-form";
import { HiEye } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  createStorageAsync,
  fetchStoragesAsync,
} from "../../store/toolkit/storage/storage.slice";
import { ResponseCreateStorageAsyncReducer } from "@/types/storage.types";
import { useAppSelector } from "@/hooks/redux.hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import {
  loginRefreshToken,
  logoutUserAsync,
} from "@/store/toolkit/user/user.slice";
import { LoginResponseType } from "@/types/auth.types";
enum TYPEINPUTPASSWORD {
  "TEXT" = "text",
  "PASSWORD" = "password",
}

const createStorageSchema = z.object({
  description: z.string().optional(),
  account: z.string().min(1, { message: "Username é obrigatório" }),
  link: z.string().optional(),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  usageLocation: z.string().min(1, { message: "Titulo é obrigatório" }),
});

type CreateStorageSchema = z.infer<typeof createStorageSchema>;

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
  } = useForm<CreateStorageSchema>({
    resolver: zodResolver(createStorageSchema),
  });

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

  const handleSubmitPress: SubmitHandler<CreateStorageSchema> = async (
    data
  ) => {
    const { account, description, link, password, usageLocation } = data;
    const { refreshToken } = await checkIsAuthenticated();
    const response: ResponseCreateStorageAsyncReducer = await dispatch(
      createStorageAsync({
        props: {
          description: description,
          account: account,
          link: link,
          password: password,
          usageLocation: usageLocation,
        },
      }) as any
    );

    if (response.error) {
      if (
        response.error.message === "Token expired or invalid" &&
        refreshToken
      ) {
        const responseLoginRefreshToken: LoginResponseType = await dispatch(
          loginRefreshToken() as any
        );
        if (responseLoginRefreshToken.payload.isAuthenticated !== true) {
          return push("/sign-in");
        }
        const response: ResponseCreateStorageAsyncReducer = await dispatch(
          createStorageAsync({
            props: {
              description: description,
              account: account,
              link: link,
              password: password,
              usageLocation: usageLocation,
            },
          }) as any
        );

        for (const key in data) {
          resetField<any>(key);
        }

        return toast({
          title: "Salvar storage",
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
      }

      if (
        response.error.message === "Token expired or invalid" &&
        !refreshToken
      ) {
        await dispatch(logoutUserAsync() as any);
        return push("/sign-in");
      }

      return toast({
        title: "Salvar storage",
        description: response.error.message,
      });
    }

    toast({
      title: "Salvar storage",
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
      <Card className="bg-primary-foreground  w-11/12 m-auto lg:w-96 ">
        <CardHeader>
          <CardTitle>Criar storage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <div className="flex flex-col w-full ">
              <Label className="text-[0.8rem]">Titulo:</Label>
              <Input
                placeholder="Passtorage"
                className="outline-none text-[0.8rem] text-red-500 focus-visible:outline-none focus-visible:ring-transparent"
                {...register("usageLocation")}
              />
            </div>
            {errors.usageLocation && (
              <InputErrorMessage>{`${errors.usageLocation?.message}`}</InputErrorMessage>
            )}
          </div>
          <div>
            <div className="flex flex-col w-full">
              <Label className="text-[0.8rem]">Username/Email:</Label>
              <Input
                placeholder="passtorageAdmin"
                className="outline-none text-[0.8rem] text-red-500 focus-visible:outline-none focus-visible:ring-transparent "
                {...register("account")}
              />
            </div>
            {errors.account && (
              <InputErrorMessage>{`${errors.account?.message}`}</InputErrorMessage>
            )}
          </div>
          <div>
            <div className="flex flex-col w-full">
              <Label className="text-[0.8rem]">Senha:</Label>
              <div className="flex items-center gap-2 border rounded-md w-full ">
                <Input
                  placeholder="123@mudar"
                  className="text-[0.8rem] text-red-500  focus-visible:outline-none focus-visible:ring-transparent border-none"
                  type={passwordIsHide}
                  {...register("password")}
                />
                <button className="mr-5 ">
                  <HiEye
                    cursor={"pointer"}
                    onClick={() => handleChangePasswordIsHide()}
                  />
                </button>
              </div>
            </div>
            {errors.password && (
              <InputErrorMessage>{`${errors.password?.message}`}</InputErrorMessage>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Label className="text-[0.8rem]">Link:</Label>
            <Input
              placeholder="https://passtorage.vercel.app/"
              className="outline-none text-[0.8rem] text-red-500 focus-visible:outline-none focus-visible:ring-transparent"
              {...register("link")}
            />
          </div>
          <div className="flex flex-col w-full">
            <Label className="text-[0.8rem]">Descrição:</Label>
            <Textarea
              placeholder="Conta criada em 05/10/2023 - email de recuperação leosilva@gmail.com"
              className="outline-none text-red-500 max-h-20 text-[0.7rem]"
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
    </main>
  );
}
