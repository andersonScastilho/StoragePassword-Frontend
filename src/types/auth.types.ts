import { LoginError } from "@/store/toolkit/user/user.slice";

export interface LoginResponseType {
  error?: {
    message: string;
  };
  payload: {
    isAuthenticated?: boolean;
    error?: LoginError;
  };
}
