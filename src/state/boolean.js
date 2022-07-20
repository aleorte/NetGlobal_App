import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setBoolean = createAsyncThunk("SET_BOOLEAN", (value) => {
  return value;
});

const booleanReducer = createReducer(
  {
    reload: true,
  },
  {
    [setBoolean.fulfilled]: (state, action) => {
      state.reload = !state.reload;
    },
  }
);

export default booleanReducer;
