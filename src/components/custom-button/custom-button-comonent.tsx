import React, { ButtonHTMLAttributes } from "react";

// Styles

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startICon?: React.ReactNode;
  children?: string;
}
const CustomButton = ({ children, startICon, ...rest }: CustomButtonProps) => {
  return (
    <button
      {...rest}
      className="w-full flex justify-center items-center rounded-md p-2 hover:border hover:border-color-contraste-secundario"
    >
      {startICon && <div>{startICon}</div>}
      {children}
    </button>
  );
};

export default CustomButton;
