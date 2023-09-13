export interface LoginResponseType {
  error?: {
    message: string;
  };
  payload: {
    isAuthenticated?: boolean;
  };
}
