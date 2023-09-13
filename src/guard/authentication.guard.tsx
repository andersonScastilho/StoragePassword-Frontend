"use client";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useDispatch } from "react-redux";
import {
  updateIsAuthenticated,
  loginRefreshToken,
} from "@/store/toolkit/Auth/auth.slice";
import { checkIsAuthenticated } from "@/functions/check-is-authenticated";
import LoadingComponent from "@/components/loading/loading-component";
import { LoginResponseType } from "@/types/auth.types";

type PrivateRouteProps = {
  children: ReactNode;
};

export const AuthenticationGuard = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const verifyIsAuthenticated = async () => {
      try {
        setIsLoading(true);
        const { token, refreshToken } = await checkIsAuthenticated();

        if (!token && !refreshToken) {
          push("/sign-in");
        }

        if (token) {
          dispatch(updateIsAuthenticated());
        }

        if (!token && refreshToken) {
          const response: LoginResponseType = await dispatch(
            loginRefreshToken() as any
          );

          if (response.error) {
            return push("/sign-in");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthenticated) {
      verifyIsAuthenticated();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {isLoading && <LoadingComponent />}
      {isAuthenticated && children}
    </>
  );
};
