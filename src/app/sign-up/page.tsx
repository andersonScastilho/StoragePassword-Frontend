"use client";
import axios from "axios";
import { InputErrorMessage } from "../../components/input-error-message/input-error-message";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { userRefreshToken } from "@/store/toolkit/user/user.slice";
import { useAppSelector } from "@/hooks/redux.hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Criar conta
            </h1>
            <div className="space-y-2 md:space-y-4">
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nome completo
                </Label>
                <Input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName?.type === "required" && (
                  <InputErrorMessage>
                    Nome completo é obrigatório
                  </InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <InputErrorMessage>Email é obrigatório</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirmação de senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("passwordConfirmation", { required: true })}
                />
                {errors.passwordConfirmation?.type === "required" && (
                  <InputErrorMessage>
                    A Confirmação de senha é obrigatória
                  </InputErrorMessage>
                )}
              </div>

              <Button
                onClick={() => handleSubmit(handleSubmitPressCreateUser)()}
                className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Entrar
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já possui uma conta ?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
