import React from "react";
import ".././css/bootstrap.min.css";
import ".././css/bootstrap-icons.css";
import ".././css/templatemo-kind-heart-charity.css";
import "./phone.css";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import {  useState } from "react";
//import { showToast } from "../SweetAlerts/Alerts";
import Swal from 'sweetalert2';
function Donate(props) {

  const user = useSelector((state) => state.auth.user);
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
  function changeUser(event) {
    props.handleInfo(event);
 }

 const changePhone= (e) => {
props.handlePhone(e);

}   


  const validate = (e) => {
   
  if (isValidPhoneNumber(props.phone) && isPossiblePhoneNumber(props.phone)) {
     
      props.handleNext();
      return true;
    } else {
      e.preventDefault();
      showToast({
        title: 'Error',
        icon: 'error',
        text: "Please Enter All  Fields",
      })
      return false;
    } 
  }; 
  return (
    <>
      <div  style={{marginTop:'50px',marginLeft:'50px'}}>
       
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <div className="col-lg-6 col-12 mb-4">
                <input
                 
                  type="text"
                  name="fname"
                  defaultValue= {user.fullName}
                  readOnly={true}
                  //onChange={changeUser}
                  className="form-control"
                  style={{width:'300px'}}
                  required
                />
              </div>

              <div className="col-lg-6 col-12 mb-4">
                <input
                  type="email"
                  defaultValue= {user.email}
                  readOnly={true}
                  name="email"
                  pattern="[^ @]*@[^ @]*"
                  className="form-control"
                  style={{width:'300px'}}
                  required
                />
              </div>

              <div className="col-lg-6 col-12 mb-4">
                <input
                  type="text"
                 value= {props.user.afood}
                  onChange={changeUser}
                  name="afood"
                  className="form-control"
                  placeholder="About food"
                  style={{width:'300px'}}
                  required
                />
              </div>

              <div className="col-lg-6 col-12  mb-4 " style={{borderColor:"rgb(151, 150, 150)" ,width:'300px'}}>
                <PhoneInput
                  className={"input-phone-number form-control"}
                  id="phone"
                  placeholder="Enter phone number"
                  value= {props.phone}
                  onChange={changePhone}
                  required
                />
              </div>

              <textarea
                value= {props.user.comment}
                onChange={changeUser}
                name="comment"
                rows="3"
                className="form-control"
                placeholder="Comment (Optional)"
              ></textarea>

           <button type="button" onClick={validate} className="btn btn-outline-danger" style={{marginTop:'20px' , width:'150px'}}>
                Next
              </button> 
            </div>
          </div>
        </div>
        
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.sticky.js"></script>
        <script src="js/counter.js"></script>
        <script src="js/custom.js"></script>
      </div>
    </>
  );
}

export default Donate;
