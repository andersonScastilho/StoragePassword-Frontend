import { useAppSelector } from "@/hooks/redux.hooks";
import { LoginAction } from "@/store/reducers/user/user.actions";
import { RefreshToken } from "@/types/refreshToken.types";
import { findCookie, saveCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const AuthenticationGuard = async () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const cookieIsAuthenticated = await findCookie("isAuthenticated");

  if (!cookieIsAuthenticated || !isAuthenticated) {
    const cookieRefreshToken: RefreshToken = await findCookie("refreshToken");

    if (cookieRefreshToken) {
      const token: string = await axios.post(
        "http://localhsot:3002/refreshToken",
        {
          id: cookieRefreshToken.id,
        }
      );

      if (!token) {
        useEffect(() => {
          router.push("/sign-in");
        }, []);
        return;
      }

      saveCookie("token", token, new Date().getMinutes() + 15);
      saveCookie("isAuthenticated", true, new Date().getMinutes() + 15);

      dispatch(
        LoginAction({
          isAuthenticated: true,
          token: token,
          refreshToken: cookieRefreshToken,
        })
      );

      return;
    }
    useEffect(() => {
      router.push("/sign-in");
    }, []);
  }
  return;
};
