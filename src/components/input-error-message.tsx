import { FunctionComponent } from "react";

interface childrenTypeProps {
  children: string;
}
export const InputErrorMessage: FunctionComponent<childrenTypeProps> = ({
  children,
}) => {
  return (
    <p className="text-[0.75rem] text-texto-error margin-5 mt-1.5">
      {children}
    </p>
  );
};
