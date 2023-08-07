"use client";

import { InputErrorMessage } from "../../components/input-error-message";
import { useForm } from "react-hook-form";

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

  const handleSubmitPress = () => {};
  return (
    <div className="bg-black min-h-screen min-w-full flex justify-center items-center ">
      <div className="bg-fundo border rounded-border-radius-7px flex flex-col gap-7  h-form-create-account p-5">
        <div>
          <h1 className="text-[2.0rem] text-texto-principal font-semibold">
            Criar conta
          </h1>
          <p className="text-[0.87rem] text-texto-principal">
            Digite os seus dados nos campos abaixo
          </p>
        </div>

        <div className=" grid grid-cols-2 gap-6">
          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Nome completo:
            </label>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria text-[0.9rem]"
            />
            {errors.fullName?.type === "required" && (
              <InputErrorMessage>
                O nome completo é obrigatorio
              </InputErrorMessage>
            )}
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria text-[0.9rem]"
            />
            {errors.email?.type === "required" && (
              <InputErrorMessage>O email é obrigatório</InputErrorMessage>
            )}
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Senha:
            </label>
            <input
              {...register("password", { required: true })}
              type="text"
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria text-[0.9rem]"
            />
            {errors.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatoria</InputErrorMessage>
            )}
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="" className="text-texto-principal font-semibold">
              Confirmação de senha:
            </label>
            <input
              {...register("passwordConfirmation", { required: true })}
              type="text"
              className="p-1 text-texto-principal outline-0 h-8 bg-terciaria text-[0.9rem]"
            />
            {errors.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                A confirmação de senha é obrigatoria
              </InputErrorMessage>
            )}
          </div>
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
