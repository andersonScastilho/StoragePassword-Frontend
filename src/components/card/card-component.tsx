import { StyledInputComponent } from "../styled-input/styled-input-component";
import { AiFillEye } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";
import { LiaKeySolid } from "react-icons/lia";
import { BiLink } from "react-icons/bi";

export const CardComponent = () => {
  return (
    <main className="bg-fundo-principal-opaco w-72 border rounded-md">
      <section className="flex flex-col gap-2 p-2">
        <h1 className="text-center text-texto-principal font-semibold text-[1.3rem]">
          Facebook
        </h1>

        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Username/Email
          </label>
          <StyledInputComponent
            initialIcon={<IoMailOutline />}
            data="leosilvacast@gmail.com"
          />
        </div>

        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Password:
          </label>
          <StyledInputComponent
            initialIcon={<LiaKeySolid />}
            data="*********"
            finishedIcon={<AiFillEye />}
          />
        </div>
        <div>
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Link:
          </label>
          <div className="p-4 flex gap-5 items-center h-8 bg-fundo-secundario border rounded-md ">
            <BiLink />
            <a
              href="http://localhost:3000"
              target="_blank"
              className="text-[0.8rem]"
            >
              http://localhost:3000
            </a>
          </div>
        </div>
        <div className="flex flex-col ">
          <label className="text-[0.8rem] text-texto-principal font-semibold">
            Descrição:
          </label>
          <p className="bg-principal  h-24 max-h-28 border rounded-md text-[0.76rem] p-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing.
          </p>
        </div>
      </section>
    </main>
  );
};
