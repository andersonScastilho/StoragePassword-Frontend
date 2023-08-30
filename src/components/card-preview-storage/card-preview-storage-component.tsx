import { Storage } from "@/types/storage.types";
import CustomButton from "../shared/custom-button/custom-button-comonent";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const CardStorageComponent = ({ props }: Storage) => {
  const { push } = useRouter();

  return (
    <div className="w-96 h-48 p-2 border gap-3 bg-cyan-600 rounded-md flex flex-col hover:scale-105">
      <h1 className="text-center font-semibold text-[1.1rem]">
        {props.usageLocation}
      </h1>
      <div className="flex flex-col gap-4">
        <p className="flex gap-3 items-center bg-white p-1 border rounded-md text-[0.9rem]">
          <MdOutlineEmail size={20} />
          {props.account}
        </p>
        <a
          href={`${props.link}`}
          target="_blank"
          className="flex gap-3 items-center p-1 bg-white border rounded-md text-[0.9rem]"
        >
          <AiOutlineLink size={20} />
          {props.link}
        </a>
      </div>
      <CustomButton
        onClick={() => push(`/storage/card-details/${props.storageId}`)}
      >
        Abrir
      </CustomButton>
    </div>
  );
};
