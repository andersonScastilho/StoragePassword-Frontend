"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { StyledInputComponent } from "../styled-input/styled-input-component";
import { AiFillEye } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";
import { LiaKeySolid } from "react-icons/lia";
import { BiLink } from "react-icons/bi";
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
import { Storage } from "@/types/storage.types";
import axios from "axios";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";

interface ShowPasswordForm {
  password: string;
}
interface DescryptedPasswordResponse {
  data: {
    descryptedPassword: string;
  };
}
export const CardComponent = ({ props }: Storage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShowPasswordForm>();

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
        `http://localhost:3002/passwords/storages/${props.storageId}`,
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
    <main className="bg-fundo-principal-opaco max w-72 h-96 border rounded-md">
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader className="text-texto-principal text-[1rem]">
            Autenticação
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-texto-principal font-semibold">
                Senha oculta:
              </label>
              <StyledInputComponent
                initialIcon={<LiaKeySolid />}
                data={password}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-texto-principal font-semibold">
                Senha:
              </label>
              <input
                {...register("password", { required: true })}
                type="text"
                className="w-72 bg-fundo-principal text-texto-secundario text-[0.8rem] p-2 border rounded-md"
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
      <section className="flex flex-col gap-2 p-2">
        <h1 className="text-center text-texto-principal font-semibold text-[1.3rem]">
          {props.usageLocation}
        </h1>
        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Username/Email
          </label>
          <StyledInputComponent
            initialIcon={<IoMailOutline />}
            data={props.account}
          />
        </div>
        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Password:
          </label>
          <StyledInputComponent
            initialIcon={<LiaKeySolid />}
            data="**********"
            finishedIcon={<AiFillEye />}
            clickFunction={() => {
              setOverlay(<OverlayTwo />);
              onOpen();
            }}
          />
        </div>
        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Link:
          </label>
          <div className="p-4 flex gap-5 items-center h-8 bg-fundo-secundario border rounded-md ">
            <BiLink />
            <a href={`${props.link}`} target="_blank" className="text-[0.8rem]">
              {props.link}
            </a>
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Descrição:
          </label>
          <p className="bg-principal  h-24 max-h-28 border rounded-md text-[0.76rem] p-2">
            {props.description}
          </p>
        </div>
      </section>
    </main>
  );
};
