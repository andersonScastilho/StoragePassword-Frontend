import { RefreshToken } from "@/types/refreshToken.types";
import { findCookie } from "./cookies";

export const checkIsAuthenticated = async () => {
  const cookieToken: string = await findCookie("token");
  const cookiesRefreshToken: RefreshToken = await findCookie("refreshToken");

  return {
    token: cookieToken,
    refreshToken: cookiesRefreshToken,
  };
};
