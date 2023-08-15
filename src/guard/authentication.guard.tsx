"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useDispatch } from "react-redux";
import { userRefreshToken } from "@/store/toolkit/user/user.slice";
import { findCookie } from "@/functions/cookies";

type PrivateRouteProps = {
  children: ReactNode;
};

export const AuthenticationGuard = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    async function refreshTokenAndCheckAuth() {
      if (!isAuthenticated) {
        const dispatchReturn = await dispatch(userRefreshToken() as any);

        if (dispatchReturn.payload.isAuthenticated !== true) {
          push(APP_ROUTES.public.signIn);
        }
      }
    }

    refreshTokenAndCheckAuth();
  }, [isAuthenticated, dispatch, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};
