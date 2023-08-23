import React, { FunctionComponent, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
  (props, ref) => {
    return (
      <input
        {...props}
        ref={ref as any}
        className="text-texto-principal border border-none w-full text-[0.9rem] p-2 rounded-md outline-none"
      />
    );
  }
);
CustomInput.displayName = "CustomInput";
export default CustomInput;
