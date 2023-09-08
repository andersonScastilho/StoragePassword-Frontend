"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
        email: data.email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary">
      <div>
        <Label>Email</Label>
        <Input {...register("email", { required: true })} />

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
