import { combineReducers } from "redux";
import userReducer from "./toolkit/user/user.slice";

const rootReducer = combineReducers({
  userReducer,
});
export default rootReducer;
