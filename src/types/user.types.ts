import { RefreshToken } from "./refreshToken.types";

interface User {
  isAuthenticated: boolean;
  token: string;
  refreshToken: RefreshToken;
}

export default User;
