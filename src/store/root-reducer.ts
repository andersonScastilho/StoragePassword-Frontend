import { combineReducers } from "redux";
import userReducer from "./toolkit/user/user.slice";
import storageReducer from "./toolkit/storage/storage.slice";

const rootReducer = combineReducers({
  userReducer,
  storageReducer,
});
export default rootReducer;
