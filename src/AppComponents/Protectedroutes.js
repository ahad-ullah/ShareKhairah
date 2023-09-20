import React from 'react'

import Login from './Login';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Protectedroutes = () => {

  return localStorage.getItem("token") ? <Outlet/> : <Navigate to="/login"></Navigate>;
}

export default Protectedroutes
