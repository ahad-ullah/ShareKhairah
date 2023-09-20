import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ".././css/bootstrap.min.css";
import ".././css/bootstrap-icons.css";
import ".././css/templatemo-kind-heart-charity.css";
import Navbar from "./Navbar";
import {  Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Donate from "./Donate";
import Donee from "./Donee";
import Googlemap from "./Googlemap";
import "./phone.css";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { Phone } from "@mui/icons-material";




const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Make a Donation", "Select Location", "Track Progress"];
}

function Multiform() {
  
  const Role =  useSelector((state)=> state.auth.user);
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email:'',
    afood:'',
    comment:'',
  });

  const[phone,setPhone]= useState("")
  const[address,setAddress]= useState("")

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const token = localStorage.getItem("token");
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const handlePhone = (e) => {
 setPhone(e)

  };

  const handleAddress= (e) => {
    setAddress(e);
    let data = JSON.stringify({
      "description": user.afood,
      "donationLocation": e,
      "phoneNumber": phone,
    });
    console.log({address});
    debugger;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7195/api/Doner/addDonationRequest',
      headers: { 
        'accept': '*/*', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
   
     };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div>
        <Navbar></Navbar>
        <main>
          <section className="donate-section">
            <div className="section-overlay"></div>
            <Sidebar></Sidebar>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-5" style={{ marginLeft: "150px" }}>
                  <form
                    className="custom-form donate-form"
                    style={{ width: "1000px" }}
                    action="#"
                    method="post"
                    role="form"
                  >
                    <div className={classes.root}>
                      <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                          const stepProps = {};
                          const labelProps = {};

                          return (
                            <Step key={label} {...stepProps}>
                              <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                      <div>
                      
                          <div>
                            {activeStep === 0 &&  (
                              <Donate user={user} phone={phone}   handlePhone={handlePhone} handleInfo={handleInfo} handleNext={handleNext}></Donate>
                            )}
                           
                             {activeStep === 1 && (
                              <Googlemap  address={address} handleAddress={handleAddress}  handleNext={handleNext} handleBack={handleBack}></Googlemap>
                            )}
                           
                            <div>
                              {activeStep === steps.length - 1 && <p style={{fontWeight:'bold' ,fontSize:'32px' , marginLeft:'250px', marginTop:'200px'}}>Thank you for Submitting</p>}
                              {activeStep === steps.length - 1 && <Link to="/ShowAcceptedrecords"> <button  type="button" style={{marginLeft:'250px' }} className="btn btn-outline-danger">Track Your Progress</button> </Link> } 
          
                            </div>
                          </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

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

export default Multiform;