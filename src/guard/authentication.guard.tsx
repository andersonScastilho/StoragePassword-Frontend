import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { useDispatch } from "react-redux";
import { userRefreshToken } from "@/store/toolkit/user/user.slice";

type PrivateRouteProps = {
  children: ReactNode
}

export const AuthenticationGuard = ({children}:PrivateRouteProps) => {
  const {push} = useRouter()
  const dispatch = useDispatch()
  
  const {isAuthenticated}= useAppSelector((state) => state.userReducer)

useEffect(() => {
  if(!isAuthenticated){
    push(APP_ROUTES.public.signIn)
  }
},[])

  return (
    <>
    {!isAuthenticated && null}
    {isAuthenticated && children}
    </>
  )
};
