import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import "./Record.css";
import { useLocation, useNavigate } from 'react-router-dom';

function Record(props) {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const { state } = useLocation();
  debugger;
  const data = state ? state.data : null;
  const statusApp = props.data.status



  /* useEffect(() => {
     fetchData();
   }, []);
 
   const fetchData = async () => {
     try {
       debugger;
       const response = await fetch('https://localhost:7195/api/Doner/GetRequests'); // Replace with your API endpoint
       const data = await response.json();
       console.log(data); // Do something with the data
     } catch (error) {
       console.log('Error fetching data:', error);
     }
   }; */


  return (


    <>

      <tbody  >
        <tr >
          <td style={{ paddingRight: '800px' }} >
            {props.data.description}
          </td>
          <td>
            {props.data.donerName}
          </td>
          <td className="text-center" >
            {statusApp == 'Accepted' && (
              <div className="badge badge-success">{props.data.status}</div>)
            }

            {statusApp == 'pending' && (
              <div className="badge badge-warning">{props.data.status}</div>)
            }

          </td>
          <td className="">

            {statusApp == 'Accepted' && (<><div class="box">
              <a href="#popup1"><button className="btn btn-primary btn-sm">Details</button></a>
            </div>

              <div id="popup1" className="overlay">
                <div className="popup">
                  <h2>Contact Donee</h2>
                  <a className="close" href="#">&times;</a>
                  <div className="content">
                    <form className="form-inline">
                      <div className="form-group mb-2">
                        <label>Donee Name</label>
                        <input type="text" readonly className="form-control ml-2" value={props.data.doneeName} />
                      </div>
                      <div className="form-group  mb-2">
                        <label >Email</label>
                        <input type="text" className="form-control " style={{ marginLeft: '55px' }} readonly value={props.data.doneeEmail} />
                      </div>
                      <div className="form-group  mb-2">
                        <label >Number</label>
                        <input type="text" className="form-control " style={{ marginLeft: '38px' }} readonly value={props.data.doneePhoneNo} />
                      </div>
                    </form>
                  </div>
                </div>
              </div></>)
            }
            {statusApp == 'pending' && (
              <button
                type="button"
                id="PopoverCustomT-1"
                className="btn btn-primary btn-sm"
                disabled
              >
                Details
              </button>)
            }

          </td>

        </tr>

      </tbody>



    </>




  )
}

export default Record
