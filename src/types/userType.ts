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

export interface ResponseVerifyEmailUserAsync {
  error?: {
    message: string;
  };

  data?: {
    isVerifiedEmail: boolean;
  };
}

export interface ResponseValidateEmailUserAsync {
  error?: {
    message: string;
  };

  payload?: {
    emailIsValid: boolean;
  };
}

export interface ResponseForgotPasswordAsync {
  error?: {
    message: string;
  };

  payload?: {
    sendedEmail: boolean;
  };
}
