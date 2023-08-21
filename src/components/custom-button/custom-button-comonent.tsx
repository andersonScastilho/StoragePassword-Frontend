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
      className="w-full flex justify-center items-center rounded-md border p-2 border-white"
    >
      {startICon && <div>{startICon}</div>}
      {children}
    </button>
  );
};

export default CustomButton;
