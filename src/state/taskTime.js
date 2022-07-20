import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const setStartTime = createAsyncThunk(
  "SET_START_TIME",
  async (value) => {
    const startTask = new Date();
    console.log(startTask, value);
    return { time: startTask, id: value };
  }
);

export const setEndTime = createAsyncThunk("SET_END_TIME", async (value) => {
  const endTask = new Date();
  return { time: endTask, id: value };
});

const taskTimeReducer = createReducer(
  {
    start: { id: null, registerTime: null },
    end: { id: null, registerTime: null },
  },
  {
    [setStartTime.fulfilled]: (state, action) => {
      state.start.time = action.payload.time;
      state.start.id = action.payload.id;
    },
    [setEndTime.fulfilled]: (state, action) => {
      state.end.time = action.payload.time;
      state.end.id = action.payload.id;
    },
  }
);

export default taskTimeReducer;
