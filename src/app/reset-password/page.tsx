"use client";
import { InputErrorMessage } from "@/components/input-error-message/input-error-message";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetPasswordAsync } from "@/store/toolkit/user/user.slice";
import { ResponseResetPasswordAsync } from "@/types/userType";
import { useAppSelector } from "@/hooks/redux.hooks";
import LoadingComponent from "@/components/loading/loading-component";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(1, { message: "Senha é obrigatório" }),
  passwordConfirmation: z
    .string()
    .min(1, { message: "Confirmação de senha é obrigatório" }),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchema>();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const token = searchParams.get("token");
  const watchPassword = watch("password");
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector((state) => state.userReducer);

  const handleSubmitPress: SubmitHandler<ResetPasswordSchema> = async (
    data
  ) => {
    const { password } = resetPasswordSchema.parse(data);

    if (!token) {
      return push("/forgot-password");
    }

    const response: ResponseResetPasswordAsync = await dispatch(
      resetPasswordAsync({ newPassword: password, token: token }) as any
    );

    if (response.error) {
      return toast({
        title: "Validar email",
        description: `${response.error.message}`,
      });
    }

    toast({
      title: "Redefinir senha",
      description: `Senha redefinida com sucesso`,
    });

    push("/sign-in");
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center p-5">
      {isLoading && <LoadingComponent />}

      <Card>
        <CardHeader>
          <CardTitle>Redefinir minha senha</CardTitle>
          <p className="text-[0.8rem]">
            Insira a nova senha nos campos abaixo para redefini-la
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <Label>Senha:</Label>
            <Input
              type="password"
              className="text-[0.85rem]"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be strong",
                },
              })}
            />
            {errors.password?.type === "pattern" && (
              <InputErrorMessage>
                Senha deve conter 8+ caracteres, minúscula, maiúscula e especial
              </InputErrorMessage>
            )}
            {errors.password?.type === "required" && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
          </div>
          <div>
            <Label>Confirmação da senha:</Label>
            <Input
              type="password"
              className="text-[0.85rem]"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />
            {errors?.passwordConfirmation?.type === "validate" && (
              <InputErrorMessage>
                As senhas precisam ser iguais
              </InputErrorMessage>
            )}
            {errors.passwordConfirmation?.type === "required" && (
              <InputErrorMessage>
                A confirmação da senha é obrigatória
              </InputErrorMessage>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleSubmit(handleSubmitPress)()}
            className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
