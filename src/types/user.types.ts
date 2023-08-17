import { RefreshToken } from "./refreshToken.types";

interface User {
  token: string;
  refreshToken: RefreshToken;
}

export default User;
