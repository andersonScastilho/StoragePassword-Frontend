interface Props {
  data: string;
  initialIcon: React.JSX.Element;
  finishedIcon?: React.JSX.Element;
  clickFunction?: () => void;
}

export const StyledInputComponent = ({
  initialIcon,
  data,
  finishedIcon,
  clickFunction,
}: Props) => {
  return (
    <div className="p-4 flex gap-5 items-center h-8 bg-fundo-secundario border rounded-md">
      {initialIcon ? <p>{initialIcon}</p> : <></>}

      <div className="flex items-center w-44 justify-between">
        <p className="text-[0.8rem]">{data}</p>
        {finishedIcon ? (
          <p className="hover:cursor-pointer" onClick={clickFunction}>
            {finishedIcon}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
