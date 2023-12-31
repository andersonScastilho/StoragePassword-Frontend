"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { HiHome } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";
import { PiPersonSimpleRunFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "@/store/toolkit/user/user.slice";
import { MdOutlineStorage } from "react-icons/md";

export const HeaderComponent = () => {
  const { isAuthenticated } = useAppSelector((state) => state.userReducer);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const navigateTo = (path: string) => {
    push(path);
  };

  const handleLogoutClick = async () => {
    await dispatch(logoutUserAsync() as any);
    push("/sign-in");
    return;
  };

  return (
    <header className="bg-primary-foreground h-16 flex items-center p-4 justify-between">
      <h1 className="text-texto-principal font-semibold text-[1.2rem]">
        P@SSTORAGE
      </h1>
      <div className="flex gap-5">
        <p>
          {
            <HiHome
              onClick={() => navigateTo("/")}
              cursor={"pointer"}
              size={30}
            />
          }
        </p>
        {isAuthenticated && (
          <p>
            {
              <MdOutlineStorage
                onClick={() => push("/storage")}
                size={30}
                cursor="pointer"
              />
            }
          </p>
        )}
        {isAuthenticated && (
          <p>
            {
              <AiOutlinePlus
                onClick={() => push("/create-storage")}
                size={30}
                cursor="pointer"
              />
            }
          </p>
        )}

        {isAuthenticated && (
          <p>
            {
              <PiPersonSimpleRunFill
                onClick={() => handleLogoutClick()}
                cursor={"pointer"}
                size={30}
              />
            }
          </p>
        )}
        {!isAuthenticated && (
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
        {!isAuthenticated && (
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
