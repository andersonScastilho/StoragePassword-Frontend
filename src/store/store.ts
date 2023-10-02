import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
