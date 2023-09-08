"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmitPress = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary ">
      <div>
        <h1 className="text-white">
          Clique no botao abaixo para verificar seu email
        </h1>
        <Button className="" onClick={() => handleSubmitPress()}>
          Verificar email
        </Button>
      </div>
    </div>
  );
}
