import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import guardsReducer from "./guards";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    guard: guardsReducer,
  },
});

export default store;
