"use client";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { InputErrorMessage } from "../../components/input-error-message/input-error-message";
import { useForm } from "react-hook-form";
import LoadingComponent from "@/components/loading/loading-component";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { userRefreshToken } from "@/store/toolkit/user/user.slice";
import { useAppSelector } from "@/hooks/redux.hooks";
import CustomInput from "@/components/custom-input/custom-input-component";
import { CustomLabelCompoent } from "@/components/custom-label/custom-label-component";
import CustomButton from "@/components/custom-button/custom-button-comonent";

interface CreateAcountForm {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAcountForm>();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { push } = useRouter();
  const { token } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (token) {
      push(APP_ROUTES.public.home);
    }

    async function isAuthenticated() {
      const { token, refreshToken } = await checkIsAuthenticated();

      if (token) {
        push(APP_ROUTES.public.home);
      }

      if (!token && refreshToken) {
        const returnDispatch = await dispatch(userRefreshToken() as any);

        if (returnDispatch.payload?.token) {
          push(APP_ROUTES.public.home);
        }
      }
    }
    isAuthenticated();
  }, [token, dispatch, push]);

  const handleSubmitPressCreateUser = async (data: CreateAcountForm) => {
    try {
      await axios.post("http://localhost:3002/users", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      if (error) {
        toast({
          title: "Account not created.",
          position: "top-right",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <main className="min-h-screen min-w-full flex justify-start items-center p-5 bg-color-principal ">
      <div className="border rounded-md ml-32 w-3/6 h-full bg-color-contraste p-4 gap-14 flex flex-col">
        <section>
          <h1 className="text-[2.3rem] text-texto-principal">Crie sua conta</h1>
          <h4 className="text-[1.2rem] text-texto-principal">
            Seja Bem vindo!
          </h4>
        </section>
        <div className="flex flex-wrap gap-10">
          <div className="w-60">
            <CustomLabelCompoent>Nome completo</CustomLabelCompoent>
            <CustomInput {...register("fullName", { required: true })} />
            {errors.fullName?.type === "required" && (
              <InputErrorMessage>Nome completo é obrigatório</InputErrorMessage>
            )}
          </div>
          <div className="w-60 ">
            <CustomLabelCompoent>Email</CustomLabelCompoent>
            <CustomInput {...register("email", { required: true })} />
            {errors.email?.type === "required" && (
              <InputErrorMessage>Email é obrigatório</InputErrorMessage>
            )}
          </div>
          <div className="w-60 ">
            <CustomLabelCompoent>Senha</CustomLabelCompoent>
            <CustomInput {...register("password", { required: true })} />
            {errors.password?.type === "required" && (
              <InputErrorMessage>Senha é obrigatória</InputErrorMessage>
            )}
          </div>
          <div className="w-60 ">
            <CustomLabelCompoent>Confirmação de senha</CustomLabelCompoent>
            <CustomInput
              {...register("passwordConfirmation", { required: true })}
            />
            {errors.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                Confirmação de senha é obrigatória
              </InputErrorMessage>
            )}
          </div>
          <CustomButton
            onClick={() => handleSubmit(handleSubmitPressCreateUser)()}
          >
            Criar Conta
          </CustomButton>
        </div>
      </div>
    </main>
  );
}
