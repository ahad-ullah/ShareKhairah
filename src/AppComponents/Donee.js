import React,{ createContext } from 'react';
import vector from "./../images/donee.jpg";
import ".././css/bootstrap.min.css";
import ".././css/bootstrap-icons.css";
import ".././css/templatemo-kind-heart-charity.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import "./phone.css";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import Swal from 'sweetalert2';
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { useEffect, useState } from "react";
export const DataContext = createContext();
function Donee(props) {

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
  



  function validateForm(e) {
    let x = document.forms["myForm"]["fname"].value;
    let y = document.forms["myForm"]["email"].value;
    let z = document.forms["myForm"]["about"].value;
    let a = document.forms["myForm"]["phone"].value;
    let b = document.forms["myForm"]["message"].value;

    if (x == "" || y == "" || z == "" || a == "" || b=="" ) {
      e.preventDefault();
      showToast({
        title: 'Error',
        icon: 'error',
        text: "Please Enter All Fields Correctly"
       } )
      return false;
    }

    else if ( (isValidPhoneNumber(props.phone) && isPossiblePhoneNumber(props.phone)))
    {
       //data.setData =({ fname: user.fname, email: user.email , message : user.message , phone: value , about : user.about });
     // navigate("/Googlemap");
    
      return true;
    }
  }



  return (

    <>
      <div>
        <Navbar></Navbar>
        <section className="volunteer-section section-padding" id="section_4">
          <Sidebar></Sidebar>

          <div className="">
            <div className="row">
              <div className="col-lg-6 col-12">
                <h2 className="text-white mb-4" style={{ marginLeft: "120px" }}>
                  {" "}
                  Donor Recipient
                </h2>

                <form
                  className="custom-form volunteer-form mb-5 mb-lg-0 "
                  style={{ marginLeft: "120px" }}
                  name="myForm"
                  method="post"
                  role="form"
                >
                  <h3 className="mb-4">Become a Donee today</h3>

                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <input
                        type="text"
                        name="fname"
                        id="volunteer-name"
                        value={props.fname}
                        className="form-control"
                        placeholder="First Name"
                        required
                      />
                    </div>

                    <div className="col-lg-6 col-12">
                      <input
                        type="email"
                        name="email"
                        value={props.email}
                        id="volunteer-email"
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Enter your Email"
                        required
                      />
                    </div>

                    <div className="col-lg-6 col-12"  style={{borderColor:"rgb(151, 150, 150)" ,width:'300px'}}>
                      <input
                        type="text"
                        name="about"
                        value={props.about}
                       onChange={(e)=>props.handleAbout(e)}
                        id="volunteer-subject"
                        className="form-control"
                        placeholder="About food required"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-12  mb-4 " style={{borderColor:"rgb(151, 150, 150)" ,width:'300px'}}>
                    <PhoneInput
                       className={"input-phone-number form-control"}
                       name="phone"
                      placeholder="Enter phone number"
                      value={props.phone}
                      onChange={(e)=>props.handlePhone(e)}
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    className="form-control"
                    value={props.message}
                  onChange={(e)=>props.handleMessage(e)}
                    id="message"
                    placeholder="Comment"
                    required
                  ></textarea>

                 
                </form>
               
          <Link  to="/Googlemap">    <button type="submit" onClick={validateForm} style={{marginLeft:'170px', marginTop:'-100px'}} className="btn btn-outline-danger">
                      Next
                  </button> </Link>
             
              </div>

              <div className="col-lg-6 col-12">
                <img
                  src={vector}
                  className="volunteer-image img-fluid"
                  alt=""
                />

                <div className="custom-block-body text-center">
                  <h4 className="text-white mt-lg-3 mb-lg-3">About Donee</h4>

                  <p className="text-white">
                    We preferred donee to be a registered Ngo for more validity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>

        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.sticky.js"></script>
        <script src="js/counter.js"></script>
        <script src="js/custom.js"></script>
      </div>
    </>

  
  );
}

export default Donee;