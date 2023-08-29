"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
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
import { fetchStorageAsync } from "@/store/toolkit/storage/storage.slice";
import { Storage } from "@/types/storage.types";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/custom-input/custom-input-component";
interface DescryptedPasswordResponse {
  data: {
    descryptedPassword: string;
  };
}
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
    formState: { errors },
  } = useForm<ShowPasswordForm>();

  const dispatch = useDispatch();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const { storage: storedStorages } = useAppSelector(
    (state) => state.storageReducer
  );

  useEffect(() => {
    const fetchStorageData = async () => {
      const { token } = await checkIsAuthenticated();
      try {
        const response = await axios.get(
          `http://localhost:3002/storages/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data;

        setSelectedStorage({
          props: {
            account: responseData.account,
            description: responseData.description,
            link: responseData.link,
            password: responseData.password,
            storageId: responseData.storageId,
            usageLocation: responseData.usageLocation,
            userId: responseData.userId,
          },
        });
      } catch (error) {
        console.error("Error fetching storage:", error);
      }
    };

    const [filteredStorage] = storedStorages.filter(
      (item) => item.props.storageId === params.id
    );

    if (storedStorages.length <= 0) {
      fetchStorageData();
    } else {
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
    try {
      const { token } = await checkIsAuthenticated();
      const passwordDescrypted: DescryptedPasswordResponse = await axios.post(
        `http://localhost:3002/passwords/storages/${params.id}`,
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassword(passwordDescrypted.data.descryptedPassword);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPassword("********");
  }, [isOpen]);
  return (
    <main className="min-h-screen min-w-full flex flex-col">
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="text-texto-principal text-[1rem]">
            Autenticação
          </ModalHeader>
          <ModalCloseButton className="text-texto-principal" />
          <ModalBody className="flex flex-col gap-5">
            <CustomInput value={password} />

            <div className="flex flex-col">
              <label className="text-texto-principal font-semibold text-[0.9rem]">
                Senha:
              </label>
              <input
                {...register("password", { required: true })}
                type="text"
                className="bg-fundo-principal text-texto-secundario text-[0.8rem] p-2 border rounded-md"
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
      <div className="flex flex-grow gap-10">
        <SideBarComponent />
        {selectedStorage && (
          <CardDetailStorageComponent dataStorage={selectedStorage} />
        )}
      </div>
    </main>
  );
}
