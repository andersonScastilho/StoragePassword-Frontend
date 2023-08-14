import { RefreshToken } from "./refreshToken.types";

export interface Auth {
  data: {
    token: string;
    refreshToken: RefreshToken;
  };
}
