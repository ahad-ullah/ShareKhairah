import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    requests: null,
    status:"",
    error: "",
}

export const getDonerRequests = createAsyncThunk("request/getDonerRequests", async (data) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://localhost:7195/api/Doner/GetDonerRequests',
        headers: { 
          'accept': '/'
        }
      };
      
      const res = await axios(config);
      return res.data;

});

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        setRequest: (state, action) => {
            state.request = action.payload;
    },
        clearRequest: (state, action) => {
            state.request =[];
    }
},

extraReducers: (builder)=>{
    // getDonerRequests from server
    builder.addCase(getDonerRequests.pending, (state)=>{

        state.status = "pending";
    });
    builder.addCase(getDonerRequests.fulfilled, (state,action)=>{
        debugger;
        if(action.payload.error) {
            state.error = action.payload.error;
        }
        else{
            state.status = "success";
            state.requests = action.payload.requests;
        }
    });
   builder.addCase(getDonerRequests.rejected, (state,action)=>{
        state.error = action.errors.message;
    });
}

});
export const { setRequest, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;