import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const nextAssignments = createAsyncThunk("GET_NEXT_ASSIGNMENTS",  async(value) => {

     try{
      const assignment = await axios.get(`http://localhost:3001/guards/${value.guardId}/nextTasks`)
      return assignment.data;
     }
     catch(error)
     {console.log(error)
    }
});

export const assignmentStartTime = createAsyncThunk("SET_ASSIGNMENT_START_TIME",  async(value) => {

    try {
       await axios.put(`http://localhost:3001/assignments/${value.assignmentId}`, {
          realStartTime: value.time,
        });


        const assignment = await await axios.get(`http://localhost:3001/guards/${value.guardId}/nextTasks`)
        return assignment.data;

      } catch (err) {
        console.log(err);
      }
   }
);

export const assignmentEndTime = createAsyncThunk("SET_ASSIGNMENT_END_TIME",  async(value) => {

    try {
        await axios.put(`http://localhost:3001/assignments/${value.assignmentId}`, {
           realEndTime: value.time,
         });
         
         const assignment = await await axios.get(`http://localhost:3001/guards/${value.guardId}/nextTasks`)
         return assignment.data;
 
       } catch (err) {
         console.log(err);
       }
    }
);

const nextAssignmentsReducer = createReducer(
  [],
  {
    [nextAssignments.fulfilled]: (state, action) => action.payload,
    [assignmentStartTime.fulfilled]: (state, action) => action.payload,
    [assignmentEndTime.fulfilled]: (state, action) => action.payload,

  }
);

export default nextAssignmentsReducer;