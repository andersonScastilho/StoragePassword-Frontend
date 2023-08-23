import { Storage } from "@/types/storage.types";
import CustomButton from "../custom-button/custom-button-comonent";
import CustomInput from "../custom-input/custom-input-component";
import { CustomLabelCompoent } from "../custom-label/custom-label-component";

export const CardStorageComponent = ({ props }: Storage) => {
  return (
    <div className="w-80 h-52 p-3 border bg-color-frescor rounded-md flex flex-col gap-5 hover:cursor-pointer hover:scale-105">
      <h1 className="text-center">{props.usageLocation}</h1>
      <div>
        <CustomLabelCompoent>Username/email:</CustomLabelCompoent>
        <CustomInput readOnly value={props.account} />
      </div>
      <div className="grid gap-3 grid-cols-2">
        <CustomButton>Editar</CustomButton>
        <CustomButton>Excluir</CustomButton>
      </div>
    </div>
  );
};
