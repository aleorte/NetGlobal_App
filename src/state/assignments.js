import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAssignments = createAsyncThunk(
  "GET_ASSIGNMENT",
  async (value) => {
    try {
      const assignment = await axios.get(
        `http://192.168.0.77:3001/assignments?guard=${value.guardId}&&month=${
          value.month + 1
        }`
      );
      return assignment.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const assignmentsReducer = createReducer([], {
  [getAssignments.fulfilled]: (state, action) => action.payload,
});

export default assignmentsReducer;
