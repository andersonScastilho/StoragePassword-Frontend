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
    <div className="bg-login bg-cover min-h-screen min-w-full flex justify-start items-center">
      <div className="ml-40 bg-fundo-principal-opaco border rounded-3xl w-form-login-container h-form-login-container flex items-center flex-col justify-evenly">
        <div>
          <h1 className="text-[2.0rem] text-texto-principal font-semibold">
            Entrar
          </h1>
          <p className="text-[0.87rem] text-texto-principal font-semibold">
            Digite os seus dados de acesso no campo abaixo
          </p>
        </div>

        <div className="flex items-center, justify-center gap-6 flex-col ">
          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              className="p-1 text-texto-secundario outline-0 h-8 bg-fundo-secundario text-[0.9rem]"
            />
            {errors.email?.type === "required" && (
              <InputErrorMessage>O Email é obrigatorio</InputErrorMessage>
            )}
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Senha:
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="p-1 text-texto-secundario outline-0 h-8 bg-fundo-secundario text-[0.9rem]"
            />
            {errors.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatoria</InputErrorMessage>
            )}
          </div>

          <p className="text-[0.9rem] text-texto-principal font-semibold underline hover:cursor-pointer">
            Esqueci minha senha
          </p>
        </div>

        <button
          onClick={() => handleSubmit(handleSubmitPress)()}
          className="border rounded-radius-7px p-2 w-60 bg-fundo-principal  inset-1 active:shadow-login-button active:text-[0.9rem]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
