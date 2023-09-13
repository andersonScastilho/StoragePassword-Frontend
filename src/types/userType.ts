export interface UserType {
  props: {
    email: string;
    fullName: string;
    password: string;
    userId: string;
  };
}

export interface ResponseCreateUserAsync {
  error?: {
    message: string;
  };

  payload?: {
    created: true;
  };
}
