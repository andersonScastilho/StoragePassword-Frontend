"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface RequestParams {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestParams>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const watchPassword = watch("password");

  const handleSubmitPress = async (data: RequestParams) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${token}`,
        {
          newPassword: data.password,
        }
      );

      toast({
        title: "Redefinir senha",
        description: `${response.data.message}`,
      });
    } catch (error: any) {
      toast({
        title: "Validar email",
        description: `${error?.response?.data?.error}`,
      });
    }
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center">
      <div className="bg-secondary w-96 p-10 flex flex-col gap-5 rounded-md">
        <h1 className="text-[1.5rem]">Redefinir minha senha</h1>
        <p className="text-[0.8rem]">
          Insira a nova senha nos campos abaixo para redefini-la
        </p>
        <div>
          <Label>Senha:</Label>
          <Input
            type="password"
            className="text-[0.85rem]"
            {...register("password", { required: true })}
          />
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
        </div>
        <Button
          onClick={() => handleSubmit(handleSubmitPress)()}
          className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
