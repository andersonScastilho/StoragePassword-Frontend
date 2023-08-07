"use client";

import { InputErrorMessage } from "../../components/input-error-message";
import { useForm } from "react-hook-form";

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

  const handleSubmitPress = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="bg-black min-h-screen min-w-full flex justify-center items-center ">
      <div className="bg-fundo border rounded-border-radius-7px w-form-container h-form-container flex items-center flex-col justify-evenly">
        <div>
          <h1 className="text-[2.0rem] text-texto-principal font-semibold">
            Entrar
          </h1>
          <p className="text-[0.87rem] text-texto-principal">
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
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria"
            />
            {errors.email?.type === "required" && (
              <InputErrorMessage>O email é obrigatorio</InputErrorMessage>
            )}
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Senha:
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria"
            />
            {errors.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatoria</InputErrorMessage>
            )}
          </div>

          <p className="text-[0.9rem] underline hover:cursor-pointer">
            Esqueci minha senha
          </p>
        </div>

        <button
          onClick={() => handleSubmit(handleSubmitPress)()}
          className="border rounded-radius-7px p-2 w-60 bg-secundaria inset-1 active:shadow-login-button active:text-[0.9rem]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
