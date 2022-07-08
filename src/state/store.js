import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import guardsReducer from "./guards";
import licensesReducer from "./licenses";
import assignmentsReducer from "./assignments";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    guard: guardsReducer,
    license: licensesReducer,
    assignment: assignmentsReducer,
  },
});

export default store;
