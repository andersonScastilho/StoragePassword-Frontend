"use client";
import LoadingComponent from "@/components/loading/loading-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/redux.hooks";
import { validateEmailAsync } from "@/store/toolkit/user/user.slice";
import { ResponseValidateEmailUserAsync } from "@/types/userType";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function ValidateEmailPage() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector((state) => state.userReducer);

  const handleSubmitPress = async () => {
    if (!token) {
      return push("/verify-email");
    }

    const response: ResponseValidateEmailUserAsync = await dispatch(
      validateEmailAsync(token) as any
    );

    if (response.error) {
      return toast({
        title: "Validação de email",
        description: `${response.error.message}`,
      });
    }

    toast({
      title: "Validação de email",
      description: `Email validado com sucesso`,
    });

    push("/sign-in");
  };

  return (
    <div className="h-full min-w-full flex flex-col gap-1 bg-primary justify-center items-center p-5">
      {isLoading && <LoadingComponent />}
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
