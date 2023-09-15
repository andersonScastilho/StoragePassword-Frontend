"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SideBarComponent } from "@/components/barra-lateral/barra-lateral-component";
import { CardDetailStorageComponent } from "@/components/card-details-storage/card-details-storage";
import { HeaderComponent } from "@/components/header/header-component";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { useAppSelector } from "@/hooks/redux.hooks";
import {
  ResponseFetchStoragePerIdAsyncReducer,
  ResponseShowEncryptedPasswordAsyncReducer,
  Storage,
} from "@/types/storage.types";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { loginRefreshToken } from "@/store/toolkit/Auth/auth.slice";
import { ToastAction } from "@/components/ui/toast";
import {
  fetchStoragePerIdAsync,
  fetchStoragesAsync,
  showEncryptedPasswordAsync,
} from "@/store/toolkit/storage/storage.slice";

interface ShowPasswordForm {
  password: string;
}

export default function CardDetailStoragePage({
  params,
}: {
  params: { id: string };
}) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ShowPasswordForm>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const { storages } = useAppSelector((state) => state.storageReducer);
  useEffect(() => {
    const fetchStorageData = async () => {
      const response: ResponseFetchStoragePerIdAsyncReducer = await dispatch(
        fetchStoragePerIdAsync(params.id) as any
      );

      if (response.error) {
        return toast({
          title: "Falha Storage",
          description: response.error.message,
        });
      }
      return setSelectedStorage(response.payload?.storage);
    };

    if (storages.length <= 0) {
      fetchStorageData();
      dispatch(fetchStoragesAsync() as any);
    } else {
      const [filteredStorage] = storages.filter(
        (item) => item.props.storageId === params.id
      );
      setSelectedStorage(filteredStorage);
    }
  }, [params.id]);

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

  const showPassword = async (data: ShowPasswordForm) => {
    const response: ResponseShowEncryptedPasswordAsyncReducer = await dispatch(
      showEncryptedPasswordAsync({
        password: data.password,
        storageId: params.id,
      }) as any
    );

    if (response.error || !response.payload?.decryptedPassword) {
      resetField("password");
      onClose();

      return toast({
        title: "Não foi possivel mostrar a senha",
        description: response.error?.message,
        action: (
          <ToastAction altText="Entra" onClick={() => onOpen()}>
            Repetir
          </ToastAction>
        ),
      });
    }

    setPassword(response.payload?.decryptedPassword);
  };

  useEffect(() => {
    resetField("password");
    setPassword("********");
  }, [isOpen]);

  return (
    <main className="h-full min-w-full flex flex-col bg-primary gap-1">
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
                {...register("password", { required: true })}
                type="password"
                className="bg-tertiary text-secondary p-2"
              />
            </div>
            <Button onClick={() => handleSubmit(showPassword)()}>
              Autenticar-se
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HeaderComponent />

      <div className="flex flex-grow gap-10 p-5">
        {selectedStorage && (
          <CardDetailStorageComponent
            dataStorage={selectedStorage}
            clickFunction={() => {
              setOverlay(<OverlayTwo />);
              onOpen();
            }}
          />
        )}
      </div>
    </main>
  );
}
