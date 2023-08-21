interface CustomLabelProps {
  children: string;
}

export const CustomLabelCompoent = ({ children }: CustomLabelProps) => {
  return (
    <>
      <label className="text-texto-principal text-[1.1rem]">{children}</label>
    </>
  );
};
