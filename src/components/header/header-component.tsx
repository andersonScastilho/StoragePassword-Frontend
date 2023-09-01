"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { HiHome } from "react-icons/hi";
import { SlLogin } from "react-icons/sl";
import { PiPersonSimpleRunFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { AiOutlineUserAdd } from "react-icons/ai";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "@/store/toolkit/user/user.slice";

export const HeaderComponent = () => {
  const { token } = useAppSelector((state) => state.userReducer);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  useEffect(() => {
    async function asyncFunction() {
      const { token } = await checkIsAuthenticated();
      if (token) {
        setIsAuthenticated(true);
      }
    }

    asyncFunction();
  }, [token]);

  return (
    <header className="bg-primary-foreground h-16 flex items-center p-4 justify-between">
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
