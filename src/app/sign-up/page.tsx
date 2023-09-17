"use client";
import { InputErrorMessage } from "../../components/input-error-message/input-error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { loginRefreshToken } from "@/store/toolkit/user/user.slice";
import { useAppSelector } from "@/hooks/redux.hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LoadingComponent from "@/components/loading/loading-component";
import { LoginResponseType } from "@/types/auth.types";
import { createUserAsync } from "@/store/toolkit/user/user.slice";
import { ResponseCreateUserAsync } from "@/types/userType";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createStorageSchema = z.object({
  fullName: z.string().min(1, { message: "Nome completo é obrigatório" }),
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Insira um email valido",
  }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  passwordConfirmation: z
    .string()
    .min(1, { message: "Confirmação de senha é obrigatório" }),
});

type CreateStorageSchema = z.infer<typeof createStorageSchema>;
export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<CreateStorageSchema>({
    resolver: zodResolver(createStorageSchema),
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
        return push(APP_ROUTES.private.home);
      }

      if (!token && refreshToken) {
        const response: LoginResponseType = await dispatch(
          loginRefreshToken() as any
        );
        if (response.error) {
          return push("/sign-in");
        }
      }
    }

    verifyIsAuthenticated();
  }, [isAuthenticated, dispatch, push]);

  const watchPassword = watch("password");

  const handleSubmitPressCreateUser: SubmitHandler<
    CreateStorageSchema
  > = async (data) => {
    const { email, fullName, password } = createStorageSchema.parse(data);

    const response: ResponseCreateUserAsync = await dispatch(
      createUserAsync({
        email: email,
        fullName: fullName,
        password: password,
      }) as any
    );

    if (response.error) {
      return toast({
        title: "Criação de usuario",
        description: response.error.message,
      });
    }

    toast({
      title: "Criação de usuario",
      description: "Usuario criado com sucesso",
    });

    return push("/sign-in");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex bg-primary w-full h-full">
      {isLoading && <LoadingComponent />}
      <div className="flex flex-col w-full items-center justify-center px-6 py-3 md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-secondary dark:text-white"
        >
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
          P@sstorage
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Criar conta
            </h1>
            <div className="space-y-2 md:space-y-4 flex flex-col gap-5 sm:gap-1">
              <div>
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Nome completo
                </Label>
                <Input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your name"
                  {...register("fullName", { required: true })}
                />
                {errors.email && (
                  <InputErrorMessage>{`${errors.fullName?.message}`}</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <InputErrorMessage>{`${errors.email?.message}`}</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Password must be strong",
                    },
                  })}
                />
                {errors.email && (
                  <InputErrorMessage>{`${errors.password?.message}`}</InputErrorMessage>
                )}
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Confirmação de senha
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("passwordConfirmation", {
                    validate: (value) => {
                      return value === watchPassword;
                    },
                  })}
                />
                {errors.email && (
                  <InputErrorMessage>{`${errors.passwordConfirmation?.message}`}</InputErrorMessage>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleSubmit(handleSubmitPressCreateUser)()}
                  className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Criar conta
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Já tem uma conta ?{" "}
                  <a
                    href="/sign-in"
                    className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                  >
                    Entrar
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
