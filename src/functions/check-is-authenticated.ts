import { RefreshToken } from "@/types/refreshToken.types";
import { findCookie } from "./cookies";

export const checkIsAuthenticated = async () => {
  const cookieToken: string = await findCookie("token");
  const cookiesRefreshToken: RefreshToken = await findCookie("refreshToken");
  const cookieIsAuthenticated: boolean = await findCookie("isAuthenticated");

  return {
    isAuthenticated: cookieIsAuthenticated,
    token: cookieToken,
    refreshToken: cookiesRefreshToken,
  };
};
