import React, { useEffect, useState } from 'react';
import Record from './Record';
import Navbar from './Navbar';

function ShowAcceptedrecords() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const options = {
        headers: headers,
      };

      const response = await fetch('https://localhost:7195/api/Doner/GetRequests', options);
      const responseData = await response.json();
      debugger;
      console.log(responseData.request)

      if (Array.isArray(responseData.request)) {
        setRequests(responseData.request);
        console.log("data-->",responseData)
      } else {
        console.log('Invalid response data:', responseData);
      }
      
    } catch (error) {
     
      console.log(error);
    }
    finally{
      setLoading(false)
    }
    console.log(requests)
  };

  return (
    <>
      <Navbar />
     
      <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta httpEquiv="Content-Language" content="en" />
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
  />
  <meta
    name="description"
    content="This is an example dashboard created using build-in elements and components."
  />
  <meta name="msapplication-tap-highlight" content="no" />
  <link
    href="https://demo.dashboardpack.com/architectui-html-free/main.css"
    rel="stylesheet"
  />
  <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header" > 
    
    <div className="app-main">
     

        <div className="container">
         
          <div className="row" >
            <div className="col-md-6 col-xl-4">
              <div className="card mb-3 widget-content bg-midnight-bloom">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Total Orders</div>
                    <div className="widget-subheading">Last year expenses</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>1896</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card mb-3 widget-content bg-arielle-smile">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left " >
                    <div className="widget-heading">Clients</div>
                    <div className="widget-subheading" >
                      Total Clients Profit
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>$ 568</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row"  >
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header">
                  Total Requests
                
                </div>
                <div className="table-responsive">
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{width: '70px'}} >Food Description<span style={{marginLeft:'710px'}}> Donar Name</span>  <span style={{marginLeft:'20px'}}> Status</span> <span style={{marginLeft:'40px'}}> Action</span></th>
                      </tr>
                    </thead>
                    {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          
        {requests.length > 0 ? (
            
            requests.map((request) => (
                
              <Record key={request.id} data={request} />
            ))
          ) : (
            <div>No requests found.</div>
          )} 
        </div>
      )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


   
    </>
  );
}

export default ShowAcceptedrecords;
