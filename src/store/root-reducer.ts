import { combineReducers } from "redux";
import userReducer from "./toolkit/Auth/auth.slice";
import storageReducer from "./toolkit/storage/storage.slice";

const rootReducer = combineReducers({
  userReducer,
  storageReducer,
});
export default rootReducer;
