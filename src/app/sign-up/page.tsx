"use client";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
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
  const toast = useToast();
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
    <div className="bg-login min-h-screen min-w-full flex justify-start items-center ">
      <div className="ml-40 bg-fundo-principal-opaco border rounded-3xl flex flex-col gap-10  h-form-create-account p-10">
        <div>
          <h1 className="text-[2.0rem] text-texto-principal font-semibold">
            Criar conta
          </h1>
          <p className="text-[0.87rem] text-texto-principal font-semibold">
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
              className="p-5 text-texto-secundario outline-0 h-8 bg-fundo-principal border rounded-md text-[0.9rem]"
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
              className="p-5 text-texto-secundario outline-0 h-8 bg-fundo-principal border rounded-md text-[0.9rem]"
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
              className="p-5 text-texto-secundario outline-0 h-8 bg-fundo-principal border rounded-md text-[0.9rem]"
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
              className="p-5 text-texto-secundario outline-0 h-8 bg-fundo-principal border rounded-md text-[0.9rem]"
            />
            {errors.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                A confirmação de senha é obrigatoria
              </InputErrorMessage>
            )}
          </div>
        </div>

        <button
          onClick={() => handleSubmit(handleSubmitPressCreateUser)()}
          className="m-auto border rounded-radius-7px p-2 w-60 bg-fundo-principal inset-1 active:shadow-login-button active:text-[0.9rem]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
