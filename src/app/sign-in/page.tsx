"use client";
import {
  loginUserAsync,
  userRefreshToken,
} from "../../store/toolkit/user/user.slice";
import { InputErrorMessage } from "../../components/input-error-message/input-error-message";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import CustomInput from "@/components/custom-input/custom-input-component";
import { CustomLabelCompoent } from "@/components/custom-label/custom-label-component";
import CustomButton from "@/components/custom-button/custom-button-comonent";

interface LoginForm {
  email: string;
  password: string;
}
export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
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

  const handleSubmitPress = (data: LoginForm) => {
    dispatch(
      loginUserAsync({
        email: data.email,
        password: data.password,
      }) as any
    );
  };

  return (
    <main className="h-screen w-full bg-color-contraste p-2">
      <section className="bg-color-contraste-secundario ml-32 h-form-login-container mt-20 w-96 p-5 flex flex-col gap-16">
        <div className="flex flex-col gap-7">
          <h1 className="text-[2.5rem] text-texto-principal font-semibold">
            Entrar
          </h1>
          <div>
            <CustomLabelCompoent>Email</CustomLabelCompoent>
            <CustomInput {...register("email", { required: true })} />
            {errors.email?.type === "required" && (
              <InputErrorMessage>Email é obrigatório</InputErrorMessage>
            )}
          </div>
          <div>
            <CustomLabelCompoent>Senha</CustomLabelCompoent>
            <CustomInput {...register("password", { required: true })} />
            {errors.password?.type === "required" && (
              <InputErrorMessage>Senha é obrigarória</InputErrorMessage>
            )}
          </div>
          <CustomButton onClick={() => handleSubmit(handleSubmitPress)()}>
            Entrar
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
