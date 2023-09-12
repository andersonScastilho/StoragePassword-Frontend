"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useDispatch } from "react-redux";
import {
  updateIsAuthenticated,
  userRefreshToken,
} from "@/store/toolkit/Auth/auth.slice";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";

type PrivateRouteProps = {
  children: ReactNode;
};

export const AuthenticationGuard = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const verifyIsRemember = async () => {
      const { token, refreshToken } = await checkIsAuthenticated();

      if (token) {
        dispatch(updateIsAuthenticated());
      }

      if (!token && refreshToken) {
        await dispatch(userRefreshToken() as any);
      }

      if (!token && !refreshToken) {
        push("/sign-in");
      }
    };

    if (!isAuthenticated) {
      verifyIsRemember();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};
