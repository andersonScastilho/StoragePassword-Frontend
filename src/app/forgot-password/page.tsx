"use client";
import { InputErrorMessage } from "@/components/input-error-message/input-error-message";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { forgotPasswordAsync } from "@/store/toolkit/user/user.slice";
import { ResponseForgotPasswordAsync } from "@/types/userType";
import { useAppSelector } from "@/hooks/redux.hooks";
import LoadingComponent from "@/components/loading/loading-component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Insira um email valido" }),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { isLoading } = useAppSelector((state) => state.userReducer);

  const handleSubmitPress: SubmitHandler<ForgotPasswordSchema> = async (
    data
  ) => {
    const { email } = forgotPasswordSchema.parse(data);

    const response: ResponseForgotPasswordAsync = await dispatch(
      forgotPasswordAsync(email) as any
    );

    if (response.error) {
      return toast({
        title: "Esqueci minha senha",
        description: `${response.error.message}`,
      });
    }

    toast({
      title: "Esqueci minha senha",
      description: `Um email foi enviado para permitir a redefinição da sua senha!`,
    });

    push("/sign-in");
  };
  return (
    <div className="h-full p-5 min-w-full flex flex-col gap-1 bg-primary justify-center items-center">
      {isLoading && <LoadingComponent />}
      <Card>
        <CardHeader>
          <CardTitle>Esqueci minha senha</CardTitle>{" "}
          <p className="text-[0.8rem] ">
            Por favor, insira o seu endereço de email cadastrado para que
            possamos enviar o link de redefinição de senha!
          </p>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Email:</Label>
            <Input
              className="text-[0.85rem]"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <InputErrorMessage>{`${errors.email?.message}`}</InputErrorMessage>
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
