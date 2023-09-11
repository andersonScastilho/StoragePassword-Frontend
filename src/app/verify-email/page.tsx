"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmitPress = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`
      );

      toast({
        title: "Validar email",
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
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center p-5">
      <Card>
        <CardHeader>
          <CardTitle>Validar email</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[0.8rem]">
            Clique no botao abaixo para validar seu email
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleSubmitPress()}
            className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
