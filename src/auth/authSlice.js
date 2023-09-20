import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import { showToast } from "../SweetAlerts/Alerts";
import Swal from 'sweetalert2';

const initialState = {
  user: null,
  status: "",
  error: "",
  success: "",
};

const showToast = (data) => {
  Swal.fire({
    title: data.title,
    icon: data.icon,
    text: data.text,
    toast: true,
    showConfirmButton: false,
    position: 'top-end',
    timer: 3000,
  });
};

export const signUpDoner = createAsyncThunk("auth/signUpDoner", async (data) => {
  var config = {  
    method: "post",
    maxBodyLength: Infinity,
    url: "https://localhost:7195/api/Accounts/RegisterDoner",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const res = await axios(config);
  return res.data;
});

export const signUpDonee = createAsyncThunk("auth/signUpDonee", async (data) => {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://localhost:7195/api/Accounts/RegisterDonee",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const res = await axios(config);
  return res.data;
});

export const logIn = createAsyncThunk("auth/logIn", async (data) => {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://localhost:7195/api/Accounts/Login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  debugger;
  const res = await axios(config);
  return res.data;
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (data) => {
  const token = localStorage.getItem("token");
  var res = await axios
      .post("https://localhost:7195/api/Accounts/UpdateProfile", data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "";
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    //_______login___________
    builder.addCase(logIn.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      debugger;
      if (action.payload.error) {
        state.error = action.payload.error;
        showToast({
          title: 'Error',
          icon: 'error',
          text: "Please Enter Right Credentials",
        }) 
      } else {
        state.user = action.payload.user;
        state.status = "Success";
        localStorage.setItem("token", action.payload.token);
      }
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //  _________signUpDoner________
    builder.addCase(signUpDoner.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(signUpDoner.fulfilled, (state, action) => {
      debugger;
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      state.success = action.payload.success;
    });
    builder.addCase(signUpDoner.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //  _________signUpDonee________
    builder.addCase(signUpDonee.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(signUpDonee.fulfilled, (state, action) => {
      debugger;
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      else{
        state.success = action.payload.success;
      }
    });
    builder.addCase(signUpDonee.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // _________updateProfile________
    builder.addCase(updateProfile.pending, (state)=>{
      state.status = "Loading";
    });
    builder.addCase(updateProfile.fulfilled, (state, action)=>{
      if (action.payload.error) {
        state.error = action.payload.error;
        state.success = "Success";
      }
      else{
        state.user = action.payload.user;
        state.status = "Success";
      }
    });
    builder.addCase(updateProfile.rejected, (state, action)=>{
      state.error = action.error.message;
    })
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;