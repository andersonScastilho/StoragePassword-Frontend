import { FunctionComponent } from "react";

interface childrenTypeProps {
  children: string;
}
export const InputErrorMessage: FunctionComponent<childrenTypeProps> = ({
  children,
}) => {
  return (
    <p className="text-[0.7rem] w-72 sm:w-96 absolute text-red-600 ">
      {children}
    </p>
  );
};
