"use client";

import { loginUserAsync } from "../../store/toolkit/user/user.slice";
import { InputErrorMessage } from "../../components/input-error-message";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux.hooks";

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

  const handleSubmitPress = (data: LoginForm) => {
    dispatch(
      loginUserAsync({
        email: data.email,
        password: data.password,
      }) as any
    );
  };

  return (
    <main className="bg-login bg-cover min-h-screen min-w-full flex justify-start items-center">
      <section className="ml-40 bg-fundo-principal-opaco border rounded-3xl w-form-login-container h-form-login-container flex items-center flex-col justify-evenly">
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
      </section>
    </main>
  );
}
