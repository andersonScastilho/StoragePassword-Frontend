"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    formState: { errors },
  } = useForm<RequestParams>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmitPress = async (data: RequestParams) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${token}`,
        {
          newPassword: data.password,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary">
      <div>
        <Label className="text-white">Senha</Label>
        <Input {...register("password", { required: true })} />
      </div>
      <div>
        <Label className="text-white">Confirmação da senha</Label>
        <Input {...register("passwordConfirmation", { required: true })} />
      </div>
      <Button onClick={() => handleSubmit(handleSubmitPress)()}>
        Redefinir senha
      </Button>
    </div>
  );
}
