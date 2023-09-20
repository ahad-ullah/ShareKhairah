import React from 'react'
import '.././css/bootstrap.min.css'
import '.././css/bootstrap-icons.css'
import '.././css/templatemo-kind-heart-charity.css'
import logo from ".././images/logo.png"
import { Link , useNavigate} from 'react-router-dom' ;
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../auth/authSlice'
import { clearRequest } from '../requests/requestSlice'
import { hover } from '@testing-library/user-event/dist/hover'





function Navbar() {
    const navigate= useNavigate();
    const user =  useSelector((state)=> state.auth.user);
    const dispatch = useDispatch();
    const  Logout = (e) =>
    {
       localStorage.removeItem('token');
       dispatch(clearUser());
       dispatch(clearRequest());
       navigate("/login");
    }

    const redirect = (e) => {
   
      if(user.userRole == 'Doner'){
        navigate('/CheckrequestsDonar');
      }
      else if(user.userRole == 'Donee'){
        navigate('/CheckreqRec');
      }
     
         
         
      }; 
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light shadow-lg">
        <div className="container">
          <img
            src={logo}
            style={{ height: "57px", width: "176px" }}
            className="logo img-fluid"
            alt=""
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

            <li className='nav-item mt-3'>
                {user && <p className="nav-link click-scroll" style={{cursor: 'pointer'}}  onClick={redirect}>
                  Requests
                </p> }
              </li>

              <li className='nav-item mt-3'>
                {user && <Link className="nav-link click-scroll" style={{cursor: 'pointer'}}  to='/ShowAcceptedrecords'>
                  TrackProgess
                </Link> }
              </li>
              {!user && <>
              <li className="nav-item mt-3">
                <Link className="nav-link click-scroll" to="/">
                  Home
                </Link>
              </li> 

               <li className="nav-item mt-3">
                <Link className="nav-link click-scroll" to="/Login">
                  Login
                </Link>
              </li>

              <li className="nav-item mt-3">
                <Link className="nav-link click-scroll" to="/SignUp1">
                  SignUp
                </Link>
                </li>
              </> 
               }
              <li style={{ margin: "0px" }}>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbar-list-4"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                { user &&
                  <div className="collapse navbar-collapse" id="navbar-list-4">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            src={user.imageUrl}
                            width="40"
                            height="40"
                            class="rounded-circle"
                          />
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          {user.userRole=='Doner' && (<Link className="dropdown-item" to="/Multiform">Dashboard</Link>)}
                          {user.userRole=='Donee' && (<Link className="dropdown-item" to="/Donee">Dashboard</Link>)}
                          <Link className="dropdown-item" to="/Userprofile">Profile</Link>
                          <button onClick={Logout} className="dropdown-item">
                            Log Out
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
