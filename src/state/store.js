import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import guardsReducer from "./guards";
import licensesReducer from "./licenses";
import assignmentsReducer from "./assignments";
import inactivitiesReducer from "./inactivities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import taskTimeReducer from "./taskTime";
import { persistStore, persistReducer } from "redux-persist";
import workedHoursReducer from "./workedHours";
import nextAssignmentsReducer from "./nextAssignments";
import booleanReducer from "./boolean";

const rootReducer = combineReducers({
  guard: guardsReducer,
  license: licensesReducer,
  assignment: assignmentsReducer,
  guardTask: taskTimeReducer,
  workedHours: workedHoursReducer,
  nextAssignments: nextAssignmentsReducer,
  boolean: booleanReducer,
  inactivities: inactivitiesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["guardTask"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
