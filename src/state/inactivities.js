import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInactivities = createAsyncThunk("GET_INACTIVITIES",  async(value) => {
     try{
      const Inactivities = await axios.get(`http://localhost:3001/inactivities?guard=${value.guardId}`)
      return Inactivities.data;
     }  
     catch(error){
      console.log(error)
     }
});

const InactivitiesReducer = createReducer(
  [],
  {
    [getInactivities.fulfilled]: (state, action) => action.payload,
  }
);

export default InactivitiesReducer;