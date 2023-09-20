import React, { useEffect } from "react";
import "./Login.css";
import {  Link, useNavigate } from "react-router-dom";
import Googlelogin from "./Googlelogin";
import vector from "./../images/loginimg.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../auth/authSlice";
import Swal from 'sweetalert2';
//import { showToast } from "../SweetAlerts/Alerts";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(()=>{
    if (user) {
      navigate("/Home");
    }
  })

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

  const Loginfunction = () => {
     dispatch(logIn({ email, password })).then((response)=>{
      debugger;
      if(!response.error && !response.payload.error && response.payload.user.userRole == 'Doner'){
        navigate('/Multiform');
      }
      else if(!response.error && !response.payload.error && response.payload.user.userRole == 'Donee'){
        navigate('/Donee');
      }
    else if(response.error){
      showToast({
        title: 'Error',
        icon: 'error',
        text: "Please Enter Right Credentials",
      })
      } 
     
     });
    
  }
  return (
    <>
      <Navbar />

      <div className="row" style={{ backgroundColor: "#EDEDED" }}>
        <div
          className="col-6 d-7 px-0 d-sm-block "
          style={{ backgroundColor: "#EDEDED" }}
        >
          <img
            src={vector}
            alt="LOGIN-BACKGROUND"
            height="650"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

        <MDBContainer
          className="mr-5 mt-5 text-center"
          style={{ width: "40% " }}
        >
          <h3 style={{ alignContent: "center" }}>Login</h3>

          <p>Please login to your account</p>
          <form>
            <div className="form-outline">
              <input
                type="email"
                id="Email"
                className="form-control mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
            </div>

            <div className="form-outline">
              <input
                type="password"
                id="Password"
                className="form-control mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="text-center">
              <button
                name="Login"
                type="button"
                onClick={Loginfunction}
                style={{
                  border: "none",
                  color: "white",
                  background:
                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  width: "200px",
                  height: "40px",
                }}
              >
                Login
              </button>

              <br></br>
              <Link
                className="nav-link px-3 me-2 mt-3 mb-3"
                to="/Forgotpassword"
              >
                Forgot password?{" "}
              </Link>

              <Googlelogin buttonText="Login with Google"></Googlelogin>
            </div>
          </form>
          <div className="d-flex align-items-center justify-content-center">
            <p className="mb-2 me-2 mt-4 ">Don't have an account?</p>
          </div>
          <div className="text-center">
            <button
              type="button"
              style={{ width: "50%" }}
              className="btn btn-outline-danger"
            >
              Create new
            </button>
          </div>
        </MDBContainer>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
