import React, { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref as any}
      className="border border-none w-full text-[0.9rem] p-2 rounded-md outline-none font-semibold text-texto-principal"
    />
  );
});
CustomInput.displayName = "CustomInput";
export default CustomInput;
