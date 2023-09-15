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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { verifyEmailUserAsync } from "@/store/toolkit/user/user.slice";
import { ResponseVerifyEmailUserAsync } from "@/types/userType";
interface RequestParamsForm {
  email: string;
}

export default function VerifyEmailPage() {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<RequestParamsForm>();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleSubmitPress = async (data: RequestParamsForm) => {
    const response: ResponseVerifyEmailUserAsync = await dispatch(
      verifyEmailUserAsync(data.email) as any
    );

    if (response.error) {
      return toast({
        title: "Verificar email",
        description: `${response.error.message}`,
      });
    }

    toast({
      title: "Verificar email",
      description: "Foi enviado um email para validar se é verdadeiro",
    });

    push("/sign-in");
  };
  return (
    <div className="h-full p-5 min-w-full flex flex-col gap-1 bg-primary justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Verificar Email</CardTitle>
          <p className="text-[0.8rem]">
            Insira seu email, para que possamos envair o link para verificar seu
            email
          </p>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Email:</Label>
            <Input
              className="text-[0.85rem]"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <InputErrorMessage>Email é obrigatório</InputErrorMessage>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleSubmit(handleSubmitPress)()}
            className="w-full  text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
