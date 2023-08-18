interface Props {
  data: string;
  inputName: string;
  initialIcon?: React.JSX.Element;
  finishedIcon?: React.JSX.Element;
  initialClickFunction?: () => void;
  finishedClickFunction?: () => void;
}

export const ContentCardComponent = ({
  data,
  inputName,
  initialIcon,
  finishedIcon,
  initialClickFunction,
  finishedClickFunction,
}: Props) => {
  return (
    <div>
      <label className="text-[0.9rem] text-texto-principal font-semibold">
        {inputName}
      </label>
      <div className="p-4 flex gap-5 items-center h-8 bg-fundo-secundario border rounded-md">
        {initialIcon && <p onClick={initialClickFunction}>{initialIcon}</p>}
        <p className="text-[0.8rem]">{data}</p>
        {finishedIcon && (
          <p className="hover:cursor-pointer" onClick={finishedClickFunction}>
            {finishedIcon}
          </p>
        )}
      </div>
    </div>
  );
};
