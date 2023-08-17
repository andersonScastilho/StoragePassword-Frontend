"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useDispatch } from "react-redux";
import { userRefreshToken } from "@/store/toolkit/user/user.slice";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
type PrivateRouteProps = {
  children: ReactNode;
};

export const AuthenticationGuard = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { token } = useAppSelector((state) => state.userReducer);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function refreshTokenAndCheckAuth() {
      const { token, refreshToken } = await checkIsAuthenticated();

      if (!token && refreshToken) {
        const dispatchReturn = dispatch(userRefreshToken() as any);

        if (!dispatchReturn.payload?.token) {
          push(APP_ROUTES.public.signIn);
        }
      }

      if (!token && !refreshToken) {
        push(APP_ROUTES.public.signIn);
      }

      setIsAuthenticated(true);
    }

    refreshTokenAndCheckAuth();
  }, [token]);

  return (
    <>
      {!token && null}
      {isAuthenticated && children}
    </>
  );
};
