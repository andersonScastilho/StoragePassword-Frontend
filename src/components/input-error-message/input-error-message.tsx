import { FunctionComponent } from "react";

interface childrenTypeProps {
  children: string;
}
export const InputErrorMessage: FunctionComponent<childrenTypeProps> = ({
  children,
}) => {
  return (
    <p className="text-[0.8rem] text-texto-error margin-5 mt-1">{children}</p>
  );
};
