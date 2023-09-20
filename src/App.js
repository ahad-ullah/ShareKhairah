import "./App.css";
import React, { useState } from "react";
import Login from "./AppComponents/Login";
import Signup1 from "./AppComponents/Signup1";
import Home from "./AppComponents/Home";
import Userimg from "./AppComponents/Userimg";
import Multiform from "./AppComponents/Multiform";
import Forgotpassword from "./AppComponents/Forgotpassword";
import Cardrec from "./AppComponents/Cardrec";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Donate from "./AppComponents/Donate";
import Userprofile from "./AppComponents/Userprofile";
import Setting from "./AppComponents/Setting";
import Donee from "./AppComponents/Donee";
import Googlemap from "./AppComponents/Googlemap";
import TrackProgress from "./AppComponents/TrackProgress";
import CheckrequestsDonar from "./AppComponents/CheckrequestsDonar";
import CheckreqRec from "./AppComponents/CheckreqRec";
import Viewdonarp from "./AppComponents/Viewdonarp";
import Record from "./AppComponents/Record";
import ShowAcceptedrecords from "./AppComponents/ShowAcceptedrecords";
import { useSelector } from "react-redux";
const USER_ROLE = {
  Doner: "Doner",
  Donee: "Donee",
  Admin: "Admin",
};
let CURRENT_USER = "";
function App() {
  const user = useSelector((state) => state.auth.user);
  if (user) {
    CURRENT_USER = user.userRole;
  }
  const [fname, setFname] = useState(user.fullName)
  const [email,setEmail]= useState(user.email)
  const [about,setAbout]= useState("")
  const [message,setMessage]= useState()
  const [phone,setPhone]= useState()

  const handleAbout = (e) => {

    setAbout(e.target.value)
 
  };

  
  const handleMessage = (e) => {

    setMessage(e.target.value)
 
  };

  
  const handlePhone = (e) => {

    setPhone(e)
 
  };

  
   

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route exact path="/Signup1" element={<Signup1 />}></Route>
          <Route
            exact
            path="/Forgotpassword"
            element={<Forgotpassword />}
          ></Route>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact
            path="/Userprofile"
            element={
              
              <PublicElement>
                <Userprofile />
              </PublicElement>
            }
          ></Route>
          <Route
            exact
            path="/Setting"
            element={
              <PublicElement>
                <Setting />
              </PublicElement>
            }
          ></Route>
           <Route
            exact
            path="/Record"
            element={
              <PublicElement>
                <Record />
              </PublicElement>
            }
          ></Route>
          
          <Route
            exact
            path="/Donate"
            element={
              <DonerElement>
                <Donate />
              </DonerElement>
            }
          ></Route>
          <Route
            exact
            path="/Donee"
            element={
              <DoneeElement>
                <Donee  fname={fname} email={email} about={about} message={message} phone={phone} handleAbout={handleAbout} handleMessage={handleMessage} handlePhone={handlePhone}/>
              </DoneeElement>
            }
          ></Route>

<Route
            exact
            path="/ShowAcceptedrecords"
            element={
              <DonerElement>
                <ShowAcceptedrecords />
              </DonerElement>
            }
          ></Route>


          <Route
            exact
            path="/Multiform"
            element={
              <DonerElement>
                <Multiform />
              </DonerElement>
            }
          ></Route>
          <Route exact path="/Googlemap" element={<Googlemap fname={fname} about={about} message={message} phone={phone}  email={email} />}></Route>
          <Route
            exact
            path="/Userimg"
            element={
              <PublicElement>
                <Userimg />
              </PublicElement>
            }
          ></Route>
          <Route
            exact
            path="/CheckreqRec"
            element={
              <DoneeElement>
                <CheckreqRec />
              </DoneeElement>
            }
          ></Route>
          <Route
            exact
            path="/CheckrequestsDonar"
            element={
              <DoneeElement>
                <CheckrequestsDonar />
              </DoneeElement>
            }
          ></Route>
          <Route
            exact
            path="/TrackProgress"
            element={
              <DonerElement>
                <TrackProgress />
              </DonerElement>
            }
          ></Route>
          <Route
            exact
            path="/Cardrec"
            element={
              <DoneeElement>
                <Cardrec />
              </DoneeElement>
            }
          ></Route>
          <Route
            exact
            path="/Viewdonarp"
            element={
              <DoneeElement>
                <Viewdonarp />
              </DoneeElement>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

function PublicElement({ children }) {
  if (CURRENT_USER == USER_ROLE.Doner || CURRENT_USER == USER_ROLE.Donee) {
    return <>{children}</>;
  }
}

function DonerElement({ children }) {
  if (CURRENT_USER == USER_ROLE.Doner || CURRENT_USER == USER_ROLE.Admin) {
    return <>{children}</>;
  } else {
    return <div>you cannot access this page</div>;
  }
}

function DoneeElement({ children }) {
  if (CURRENT_USER == USER_ROLE.Donee || CURRENT_USER == USER_ROLE.Admin) {
    return <>{children}</>;
  } else {
    return <div>you cannot access this page</div>;
  }
}

export default App;