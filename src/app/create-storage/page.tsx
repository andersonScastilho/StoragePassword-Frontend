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
import { loginRefreshToken } from "@/store/toolkit/user/user.slice";
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
  usageLocation: z.string().min(1, { message: "Local de uso é obrigatório" }),
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
                  {...register("usageLocation")}
                />
              </div>
              {errors.usageLocation && (
                <InputErrorMessage>{`${errors.usageLocation?.message}`}</InputErrorMessage>
              )}
            </div>

            <div>
              <div className="flex gap-3 items-center w-full">
                <Label className="text-[0.8rem]">Username:</Label>
                <Input
                  className="outline-none text-[0.8rem] text-red-800 font-semibold"
                  {...register("account")}
                />
              </div>
              {errors.account && (
                <InputErrorMessage>{`${errors.account?.message}`}</InputErrorMessage>
              )}
            </div>

            <div>
              <div className="flex gap-3 items-center w-full">
                <Label className="text-[0.8rem]">Senha:</Label>
                <div className="flex items-center gap-2 border rounded-md w-full">
                  <Input
                    className="outline-none text-[0.8rem] text-red-800 font-semibold border-none"
                    type={passwordIsHide}
                    {...register("password")}
                  />
                  <button className="mr-5">
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
