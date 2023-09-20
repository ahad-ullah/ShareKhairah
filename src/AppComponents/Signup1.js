import React from 'react';
import * as Components from './../Style.js';
//import './Signup1.css';
import Footer from './Footer';
import vector from "./../images/signupimage.jpg" ;
import Googlelogin from './Googlelogin';
import Navbar from './Navbar.js';
import { useDispatch } from "react-redux";
import { signUpDoner, signUpDonee } from "../auth/authSlice";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Signup1() {
    const [signIn, toggle] = React.useState(true);
    const [email,setEmail] = React.useState("");
    const [name,setName] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [registrationNo, setRegistrationNo] = React.useState("");
    const [confirmPassword,setConfirmPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showAleart = (data)=>{
        Swal.fire({
            title:"Success",
            text: `${data}`,
            icon: "success",
            confirmButton: "OK",
        }).then(()=>{
            navigate("/login")
        });
    }

    const showToast = (data) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${data}`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      };

    const registerDoner = ()=>{
        debugger;
       dispatch(signUpDoner({
        fullName: name,
        email: email,
        password: password
       })).then((response)=>{
        showAleart("Success fully registered");
       }).catch((error)=>{
        showToast(error.message);
       });
    }

    const registerDonee = ()=>{
        debugger;
       dispatch(signUpDonee({
        registrationId: registrationNo,
        fullName: name,
        email: email,
        password: password
       })).then((response)=>{
        if(response.error) {
            showToast(response.error);
        }
        else
            showAleart(response.payload.success);
       });
    }
    return(
        <>
        
        <div className="App mt-0" style={{backgroundImage: `url(${vector})`, backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',}}>
           <Navbar></Navbar> 
        <Components.Container  className= "mb-5"> 
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title style={{color:'black',}}>Sign Up as Donor</Components.Title>
                    <Components.Input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} />
                    <Components.Input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <Components.Input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Components.Input type='password' placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                    <Components.Button type='button' style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' , color:'white',}} onClick={registerDoner} >Sign Up</Components.Button>
                    <div className='mt-3'> <Googlelogin ></Googlelogin> </div>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title style={{color:'black',}} >SignUp as Recipient</Components.Title>
                     <Components.Input type='text' placeholder='Registration Number' onChange={(e)=>{setRegistrationNo(e.target.value)}} />
                     <Components.Input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} />
                     <Components.Input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
                     <Components.Input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
                     <Components.Input type='password' placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                     <Components.Button type='button' style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',}} onClick={registerDonee} >Sign Up</Components.Button>
                 </Components.Form>
            </Components.SignInContainer>
        

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',}} signinIn={signIn}>
                    <Components.Title style={{color:'white',}}>Sign Up as Donor Recipient</Components.Title>
                    <Components.Paragraph style={{color:'white',}}>
                        To keep connected with us please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton  className="btn-light" onClick={() => toggle(true)}>
                        Sign Up
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel  style={{background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',}} signinIn={signIn}>
                      <Components.Title style={{color:'white',}}>Join us as a Donor</Components.Title>
                      <Components.Paragraph style={{color:'white',}}>
                          Enter Your personal details and start journey with us
                      </Components.Paragraph>
                          <Components.GhostButton className="btn-light" onClick={() => toggle(false)}>
                              Sign Up 
                          </Components.GhostButton> 
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
        <Footer /> 
        </div>
        </>
    )
}

export default Signup1