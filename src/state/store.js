import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import guardsReducer from "./guards";
import licensesReducer from "./licenses";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }
  ).concat(logger),
  reducer: {
    guard: guardsReducer,
    license: licensesReducer,

  },
});

export default store;
