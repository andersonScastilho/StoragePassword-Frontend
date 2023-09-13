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

export interface ResponseVerifyEmailAsync {
  error?: {
    message: string;
  };

  data?: {
    isVerifiedEmail: boolean;
  };
}
