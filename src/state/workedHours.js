import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getWorkedHours = createAsyncThunk("GET_WORKED_HOURS",  async(value) => {
    const workedHours = await axios.get(`http://localhost:3001/guards/hours/${value.guardId}?month=${value.month+1}`)
    return workedHours;
});



const workedHoursReducer = createReducer(
  {},
  {
    [getWorkedHours.fulfilled]: (state, action) => action.payload,
  }
);

export default workedHoursReducer;
