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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Senha é obrigatório" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Senha deve conter 8+ caracteres, minúscula, maiúscula e especial",
        }
      ),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatório" }),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Senha e confirmação de senha devem ser iguais",
      path: ["passwordConfirmation"],
    }
  );

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector((state) => state.userReducer);
  const [isClickEnabled, setIsClickEnabled] = useState(true);

  const handleSubmitPress: SubmitHandler<ResetPasswordSchema> = async (
    data
  ) => {
    try {
      if (!isClickEnabled) {
        return;
      }

      setIsClickEnabled(false);

      const { password } = resetPasswordSchema.parse(data);

      if (!token) {
        return push("/forgot-password");
      }

      const response: ResponseResetPasswordAsync = await dispatch(
        resetPasswordAsync({ newPassword: password, token: token }) as any
      );

      if (response.error) {
        return toast({
          title: "Redefinir senha",
          description: `${response.error.message}`,
        });
      }

      toast({
        title: "Redefinir senha",
        description: `Senha redefinida com sucesso`,
      });

      setTimeout(() => {
        setIsClickEnabled(true);
      }, 2000);

      return push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center p-5">
      {isLoading && <LoadingComponent />}

      <Card>
        <CardHeader>
          <CardTitle>Redefinir minha senha</CardTitle>
          <p className="text-[0.8rem]">
            Por favor, insira a nova senha nos campos abaixo para realizar a
            redefinição!
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <Label>Senha:</Label>
            <Input
              type="password"
              className="text-[0.85rem] touch-none"
              {...register("password")}
            />{" "}
            {errors.password && (
              <InputErrorMessage>{`${errors.password.message}`}</InputErrorMessage>
            )}
          </div>
          <div>
            <Label>Confirmação da senha:</Label>
            <Input
              type="password"
              className="text-[0.85rem] touch-none"
              {...register("passwordConfirmation", { required: true })}
            />
            {errors.passwordConfirmation && (
              <InputErrorMessage>{`${errors.passwordConfirmation.message}`}</InputErrorMessage>
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
