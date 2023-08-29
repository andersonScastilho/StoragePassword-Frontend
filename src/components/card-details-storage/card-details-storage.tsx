import { Storage } from "@/types/storage.types";
import { BiLink } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { HiEye, HiMail } from "react-icons/hi";
import { IoKey } from "react-icons/io5";
import { JsxAttribute } from "typescript";

interface CardDetailsProps {
  dataStorage: Storage;
}
export const CardDetailStorageComponent = ({
  dataStorage,
}: CardDetailsProps) => {
  return (
    <div className="w-2/3 m-auto border rounded-md bg-slate-600 p-3">
      <h1 className="text-[1.3rem] text-center text-texto-principal">
        Dados Salvos
      </h1>
      <div className=" h-80 grid grid-cols-2 items-center">
        <div className="p-3 flex flex-col gap-1">
          <p className="text-texto-secundario">Local de uso:</p>
          <p className="bg-slate-50 p-2 border rounded-sm flex gap-3 items-center">
            <span>
              <FiBook />
            </span>
            {dataStorage.props.usageLocation}
          </p>
        </div>
        <div className="p-3 flex flex-col gap-1">
          <p className="text-texto-secundario">Username:</p>
          <p className="bg-slate-50 p-2 border rounded-sm flex gap-3 items-center">
            <span>
              <HiMail />
            </span>
            {dataStorage.props.account}
          </p>
        </div>
        <div className="p-3 flex flex-col gap-1">
          <p className="text-texto-secundario">Senha:</p>
          <p className="bg-slate-50 p-2 border rounded-sm flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <IoKey />
              *******
            </span>
            <span className="mr-3">
              <HiEye cursor={"pointer"} />
            </span>
          </p>
        </div>
        <div className="p-3 flex flex-col gap-1">
          <p className="text-texto-secundario">Link</p>
          <p className="bg-slate-50 p-2 border rounded-sm flex gap-3 items-center">
            <span>
              <BiLink />
            </span>
            {dataStorage.props.link}
          </p>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1">
        <p className="text-texto-secundario">Descrição:</p>
        <p className="bg-slate-50 h-24 p-2 border rounded-sm">
          {dataStorage.props.description}
        </p>
      </div>
    </div>
  );
};
