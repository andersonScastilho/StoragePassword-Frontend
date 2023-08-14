import { RefreshToken } from "@/types/refreshToken.types";
import { UserActions } from "./user.actions";
import UserActionTypes from "./user.actions.type";

interface InitialState {
  token: string | null;
  refreshToken: RefreshToken | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

const userReducer = (
  state = initialState,
  action: UserActions
): InitialState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        refreshToken: action.payload.refreshToken,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case UserActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
export default userReducer;
