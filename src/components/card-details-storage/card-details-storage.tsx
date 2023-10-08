import {
  PartialStorage,
  ResponseDeleteStorageAsyncReducer,
  ResponseShowEncryptedPasswordAsyncReducer,
  ResponseUpdateStorageAsyncReducer,
  Storage,
} from "@/types/storage.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { HiEye } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  deleteStorageAsync,
  fetchStoragePerIdAsync,
  showEncryptedPasswordAsync,
  updateStorageAsync,
} from "../../store/toolkit/storage/storage.slice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import {
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { ToastAction } from "../ui/toast";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { LoginResponseType } from "@/types/auth.types";
import {
  loginRefreshToken,
  logoutUserAsync,
} from "@/store/toolkit/user/user.slice";

const updateStorageSchema = z.object({
  password: z.string().optional(),
  account: z.string().optional(),
  usageLocation: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
});

type UpdateStorageSchema = z.infer<typeof updateStorageSchema>;

const showEncryptedPasswordSchema = z.object({
  password: z.string().min(1, { message: "Senha é obrigatório" }),
});

type ShowEncryptedPasswordSchema = z.infer<typeof showEncryptedPasswordSchema>;

export const CardDetailStorageComponent = (storage: Storage) => {
  const {
    handleSubmit,
    resetField,
    register,
    formState: { errors },
  } = useForm<UpdateStorageSchema>({
    resolver: zodResolver(updateStorageSchema),
  });

  const {
    handleSubmit: handleSubmitShowPassword,
    resetField: resetFieldShowPassword,
    register: registerShowPassword,
    formState: { errors: errorsShowPassword },
  } = useForm<ShowEncryptedPasswordSchema>({
    resolver: zodResolver(showEncryptedPasswordSchema),
  });

  const { push } = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [password, setPassword] = useState<string>("");

  const handleSubmitPressShowUser: SubmitHandler<
    ShowEncryptedPasswordSchema
  > = async (data) => {
    const { refreshToken } = await checkIsAuthenticated();
    const response: ResponseShowEncryptedPasswordAsyncReducer = await dispatch(
      showEncryptedPasswordAsync({
        password: data.password,
        storageId: storage.props.storageId,
      }) as any
    );
    if (
      response.error?.message === "Token expired or invalid" &&
      refreshToken
    ) {
      const responseLoginRefreshToken: LoginResponseType = await dispatch(
        loginRefreshToken() as any
      );
      if (responseLoginRefreshToken.payload.isAuthenticated !== true) {
        return push("/sign-in");
      }

      const response: ResponseShowEncryptedPasswordAsyncReducer =
        await dispatch(
          showEncryptedPasswordAsync({
            password: data.password,
            storageId: storage.props.storageId,
          }) as any
        );
      if (response.error || !response.payload?.decryptedPassword) {
        resetField("password");
        onClose();

        return toast({
          title: "Exibir senha!",
          description: response.error?.message,
          action: (
            <ToastAction altText="Entra" onClick={() => onOpen()}>
              Repetir
            </ToastAction>
          ),
        });
      }

      resetField("password");

      return setPassword(response.payload?.decryptedPassword);
    }

    if (
      response.error?.message === "Token expired or invalid" &&
      !refreshToken
    ) {
      await dispatch(logoutUserAsync() as any);
      return push("/sign-in");
    }

    if (response.error || !response.payload?.decryptedPassword) {
      resetField("password");
      onClose();

      return toast({
        title: "Exibir senha!",
        description: response.error?.message,
        action: (
          <ToastAction altText="Entra" onClick={() => onOpen()}>
            Repetir
          </ToastAction>
        ),
      });
    }

    resetField("password");

    return setPassword(response.payload?.decryptedPassword);
  };

  const handleSubmitPress: SubmitHandler<UpdateStorageSchema> = async (
    data
  ) => {
    const { refreshToken } = await checkIsAuthenticated();
    const valuesToUpdate: UpdateStorageSchema = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key as keyof PartialStorage] !== "") {
          valuesToUpdate[key as keyof PartialStorage] =
            data[key as keyof PartialStorage];
        }
      }
    }

    const response: ResponseUpdateStorageAsyncReducer = await dispatch(
      updateStorageAsync({
        storageId: storage.props.storageId,
        updateProps: valuesToUpdate,
      }) as any
    );

    if (response.error) {
      if (
        response.error.message === "Token expired or invalid" &&
        refreshToken
      ) {
        const responseLoginRefreshToken: LoginResponseType = await dispatch(
          loginRefreshToken() as any
        );
        if (responseLoginRefreshToken.payload.isAuthenticated !== true) {
          return push("/sign-in");
        }

        const response: ResponseUpdateStorageAsyncReducer = await dispatch(
          updateStorageAsync({
            storageId: storage.props.storageId,
            updateProps: valuesToUpdate,
          }) as any
        );

        if (response.error) {
          return toast({
            title: "Atualizar storage!",
            description: `${response.error.message}`,
          });
        }

        for (const key in data) {
          resetField<any>(key);
        }

        return toast({
          title: "Atualizar storage!",
          description: "Aqui suas senhas estão segura!",
        });
      }

      if (
        response.error.message === "Token expired or invalid" &&
        !refreshToken
      ) {
        await dispatch(logoutUserAsync() as any);
        return push("/sign-in");
      }

      return toast({
        title: "Atualizar storage!",
        description: `${response.error.message}`,
      });
    }

    toast({
      title: "Atualizar storage!",
      description: "Aqui suas senhas estão segura!",
    });

    for (const key in data) {
      resetField<any>(key);
    }
  };

  const handleDeletePress = async () => {
    const { refreshToken } = await checkIsAuthenticated();
    const response: ResponseDeleteStorageAsyncReducer = await dispatch(
      deleteStorageAsync(storage.props.storageId) as any
    );

    if (response.error) {
      if (
        response.error.message === "Token expired or invalid" &&
        refreshToken
      ) {
        const responseLoginRefreshToken: LoginResponseType = await dispatch(
          loginRefreshToken() as any
        );
        if (responseLoginRefreshToken.payload.isAuthenticated !== true) {
          return push("/sign-in");
        }
        const response: ResponseDeleteStorageAsyncReducer = await dispatch(
          deleteStorageAsync(storage.props.storageId) as any
        );

        if (response.error) {
          return toast({
            title: "Deletar storage!",
            description: response.error.message,
          });
        }

        toast({
          title: "Deletar storage!",
          description: "Storage deletado com sucesso!",
        });

        return push("/storage");
      }

      if (
        response.error.message === "Token expired or invalid" &&
        !refreshToken
      ) {
        await dispatch(logoutUserAsync() as any);
        return push("/sign-in");
      }

      return toast({
        title: "Deletar storage!",
        description: response.error.message,
      });
    }

    toast({
      title: "Deletar storage!",
      description: "Storage deletado com sucesso!",
    });

    push("/storage");
  };

  useEffect(() => {
    resetFieldShowPassword("password");
    setPassword("********");
  }, [isOpen]);

  return (
    <Card className="bg-primary-foreground border-none w-96 m-auto">
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="text-texto-principal text-[1rem]">
            Autenticação
          </ModalHeader>
          <ModalCloseButton className="text-texto-principal" />
          <ModalBody className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-texto-principal font-semibold text-[0.9rem]">
                Senha Oculta:
              </Label>
              <Input
                readOnly
                value={password}
                className="bg-tertiary text-secondary p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-texto-principal font-semibold text-[0.9rem]">
                Senha:
              </Label>
              <Input
                {...registerShowPassword("password", { required: true })}
                type="password"
                className="bg-tertiary text-secondary p-2 touch-none"
              />
            </div>
            <Button
              onClick={() =>
                handleSubmitShowPassword(handleSubmitPressShowUser)()
              }
            >
              Autenticar-se
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <Label className="">Titulo:</Label>
          <Input
            readOnly
            value={storage.props?.usageLocation}
            className="outline-none text-[0.8rem] text-red-800 font-semibold items-center border-spacing-1"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Username:</Label>
          <Input
            readOnly
            value={storage.props?.account}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center border-spacing-1"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Senha:</Label>
          <div className="flex items-center gap-2 border rounded-md">
            <Input
              readOnly
              value={"******"}
              className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center border-spacing-1 border-none"
            />
            <span className="mr-5">
              <HiEye
                cursor={"pointer"}
                onClick={() => {
                  setOverlay(<OverlayTwo />);
                  onOpen();
                }}
              />
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Label>Link:</Label>
          <Input
            readOnly
            value={storage.props?.link}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center border-spacing-1"
          />
        </div>
        <div className="flex gap-3 items-center">
          <Label className="">Description:</Label>
          <Textarea
            readOnly
            value={storage.props?.description}
            className="outline-none  text-[0.8rem] text-red-800 font-semibold items-center border-spacing-1 max-h-20"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-green-700 text-white  p-5"
            >
              Atualizar Storage
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Storage</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Local de uso</Label>
                <Input
                  id="name"
                  className="col-span-3"
                  {...register("usageLocation")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Username</Label>
                <Input className="col-span-3" {...register("account")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Senha</Label>
                <Input className="col-span-3" {...register("password")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Link</Label>
                <Input className="col-span-3" {...register("link")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Descrição</Label>
                <Textarea
                  className="col-span-3 max-h-16"
                  {...register("description")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => handleSubmit(handleSubmitPress)()}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-red-700 text-white  p-5"
            >
              Deletar Storage
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza disso ?</AlertDialogTitle>
              <AlertDialogDescription>
                Após a exclusão do storage, não sera possivel recupera-lo !
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeletePress()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
