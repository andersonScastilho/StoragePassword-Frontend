// import { createStore, applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const persistedRootReducer: typeof rootReducer = rootReducer;

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>;
