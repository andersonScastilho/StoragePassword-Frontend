"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { HiHome } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";
import { PiPersonSimpleRunFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { AiOutlineUserAdd } from "react-icons/ai";

export const HeaderComponent = () => {
  const { token } = useAppSelector((state) => state.userReducer);
  const { push } = useRouter();

  const navigateTo = (path: string) => {
    push(path);
  };

  return (
    <header className="bg-fuchsia-100 h-16 flex items-center p-4 justify-between">
      <h1 className="text-texto-principal font-semibold text-[1.2rem]">
        P@SSTORAGE
      </h1>
      <div className="flex gap-8">
        <p>
          {
            <HiHome
              onClick={() => navigateTo("/")}
              cursor={"pointer"}
              size={30}
            />
          }
        </p>
        {token && (
          <p>{<PiPersonSimpleRunFill cursor={"pointer"} size={30} />}</p>
        )}

        {!token && (
          <p>
            {
              <SlLogin
                onClick={() => navigateTo("/sign-in")}
                cursor={"pointer"}
                size={30}
              />
            }
          </p>
        )}

        {!token && (
          <p>
            {
              <AiOutlineUserAdd
                onClick={() => navigateTo("/sign-up")}
                cursor={"pointer"}
                size={30}
              />
            }
          </p>
        )}
      </div>
    </header>
  );
};
