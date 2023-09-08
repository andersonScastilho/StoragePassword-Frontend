"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
interface RequestParamsForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RequestParamsForm>();

  const handleSubmitPress = async (data: RequestParamsForm) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          email: data.email,
        }
      );
      toast({
        title: "Esqueci minha senha",
        description: `${response.data.message}`,
      });
    } catch (error: any) {
      toast({
        title: "Esqueci minha senha",
        description:
          `${error?.response?.data?.error}` || "Ocorreu um erro inesperado",
      });
    }
  };
  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center">
      <div className="bg-secondary w-96 p-10 flex flex-col gap-10 rounded-md">
        <h1 className="text-[1.5rem]">Esqueci minha senha</h1>
        <p className="text-[0.8rem]">
          Insira seu email, para que possamos envair o link para redefinir a
          senha
        </p>
        <div>
          <Label>Email:</Label>
          <Input
            className="text-[0.85rem]"
            {...register("email", { required: true })}
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
