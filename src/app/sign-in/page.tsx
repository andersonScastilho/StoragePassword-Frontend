"use client";
import {
  loginUserAsync,
  loginRefreshToken,
} from "../../store/toolkit/user/user.slice";
import { InputErrorMessage } from "../../components/input-error-message/input-error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import LoadingComponent from "@/components/loading/loading-component";
import { LoginResponseType } from "@/types/auth.types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email invalido" }),
  password: z.string().min(1, { message: "Senha é obrigatório" }),
  rememberMe: z.boolean(),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector(
    (state) => state.userReducer
  );
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      push(APP_ROUTES.private.home);
    }

    async function verifyIsAuthenticated() {
      const { token, refreshToken } = await checkIsAuthenticated();

      if (token) {
        push(APP_ROUTES.private.home);
      }

      if (!token && refreshToken) {
        const returnDispatch: LoginResponseType = await dispatch(
          loginRefreshToken() as any
        );

        if (returnDispatch.error) {
          return push("/sign-in");
        }
      }
    }

    verifyIsAuthenticated();
  }, [isAuthenticated, dispatch, push]);

  const handleSubmitPress: SubmitHandler<SignInSchema> = async (data) => {
    const { email, password, rememberMe } = data;

    const response: LoginResponseType = await dispatch(
      loginUserAsync({
        email: email,
        password: password,
        rememberMe: rememberMe,
      }) as any
    );
    if (response.error) {
      if (response.error.message === "Unverified email") {
        return push("/verify-email");
      }

      return toast({
        title: "Login Falhou",
        description: response.error.message,
      });
    }

    return push("/");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 bg-primary flex w-full h-full">
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col items-center w-full m-auto justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-secondary dark:text-white"
        >
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
          P@sstorage
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Entrar
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <InputErrorMessage>{`${errors.email.message}`}</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border touch-none  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
                {errors.password && (
                  <InputErrorMessage>{`${errors.password.message}`}</InputErrorMessage>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      {...register("rememberMe")}
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label className="text-gray-500 dark:text-gray-300">
                      Lembrar de mim
                    </Label>
                  </div>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Button
                onClick={() => handleSubmit(handleSubmitPress)()}
                className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Entrar
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não tem uma conta ?{" "}
                <a
                  href="/sign-up"
                  className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                >
                  Criar conta
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
