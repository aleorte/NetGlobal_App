import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { removeValue,storeData } from "../utils/asyncStorage";


export const getGuard = createAsyncThunk("GET_GUARD",  async(value) => {
        const guard = await axios.post("http://localhost:3001/employees/login",{email:value.email,password:value.password})
        storeData(guard.data).then(console.log("GUARDADO"))
        return guard.data;
});

export const setGuard = createAsyncThunk("SET_GUARD",  (value) => {
    return value;
});

export const logout = createAsyncThunk("LOGOUT",  () => {
  removeValue("guard")
  return {};
});

const guardsReducer = createReducer(
  {},
  {
    [getGuard.fulfilled]: (state, action) => action.payload,
    [setGuard.fulfilled]: (state, action) => action.payload,
    [logout.fulfilled]: (state, action) => action.payload,


  }
);

export default guardsReducer;