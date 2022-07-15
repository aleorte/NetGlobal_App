import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const setLicenses = createAsyncThunk("SET_LICENSES",  async(value) => {

    const licenses = await axios.get(`http://localhost:3001/guards/${value}/licenses`)
    return licenses.data;
});



const licensesReducer = createReducer(
  [],
  {
    [setLicenses.fulfilled]: (state, action) => action.payload,
  }
);

export default licensesReducer;
