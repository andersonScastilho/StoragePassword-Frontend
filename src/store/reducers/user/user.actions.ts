import User from "../../../types/user.types";
import UserActionTypes from "./user.actions.type";

interface LoginUserAction {
  type: typeof UserActionTypes.LOGIN;
  payload: User;
}

export const LoginAction = (payload: User): LoginUserAction => ({
  type: UserActionTypes.LOGIN,
  payload,
});
interface LogoutUserAction {
  type: typeof UserActionTypes.LOGOUT;
}
export const LogoutAction = (): LogoutUserAction => ({
  type: UserActionTypes.LOGOUT,
});

export type UserActions = LoginUserAction | LogoutUserAction;
