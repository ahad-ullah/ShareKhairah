import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cardrec from './Cardrec';
import { getDonerRequests } from '../requests/requestSlice';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

export default function CheckreqRec() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getDonerRequests()).then((response) => {
        const { requests } = response.payload;
        setRequests(requests);
        setLoading(false); // Set loading to false after fetching data  
      }).catch((error) => {
        // Handle error
        setLoading(false);
        debugger;
        console.log(error);
        showToast({
          title: 'Error',
          icon: 'error',
          text: "Something went wrong",
        }) // Set loading to false in case of error
      });

    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#D4D4D4' }}>
      <Navbar></Navbar>
      <h1>Requests</h1>
      {loading ? (
        <div>Loading...</div> // Show loading indicator/message
      ) : (
        requests.map((item) => (
          <Cardrec
            style={{ backgroundColor: '#D4D4D4' }}
            key={item.id}
            list={item}
          ></Cardrec>
        ))
      )}
    </div>
  );
} 
/*import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Cardrec from './Cardrec';
import { getDonerRequests } from '../requests/requestSlice';

export default function CheckreqRec() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const data = useSelector((state)=> state.requests);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getDonerRequests());
        const { requests } = response.payload; // Assuming the response contains a property "requests" with the array of data
        setRequests(requests);
        console.log(data);
        console.log(requests);
        debugger;
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div  style={{ backgroundColor: '#D4D4D4' }}>
      <h1>Requests</h1>
      {requests.map(item=>(
        <Cardrec style={{ backgroundColor: '#D4D4D4' }} key={item.id} list={item} ></Cardrec>
      ))}
    </div>
  );
} */

