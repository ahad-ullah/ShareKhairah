import React, { useEffect } from 'react'
import "./CheckreqRec.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Viewdonarp() {
  const { state } = useLocation();
  const data = state ? state.data : null;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    debugger;
    if (!data) {
      navigate("/CheckreqRec");
    }
  });

  const acceptReq = () => {
    if (data) {
      let id = JSON.stringify(data.id);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7195/api/Doner/AcceptDonerRequest',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: id
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div>

      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBTypography tag="h5"> </MDBTypography>
                    <MDBCardText  style={{marginTop:'100px', fontSize:'30px'}}> <strong>{data ? data.donerName : ""}</strong> </MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                    <button type="button" className="btn btn-light" onClick={acceptReq} style={{ marginTop: '20px', width: '150px' }}>
                      Accept
                    </button>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Name</MDBTypography>
                          <MDBCardText className="text-muted">{data ? data.donerName: ""}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">{data ? data.donerPhoneNo : ""}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{data ? data.donerEmail : ""}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address</MDBTypography>
                          <MDBCardText className="text-muted">{data ? data.donationLocation : ""}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Food Details</MDBTypography>
                          <MDBCardText className="text-muted">{data ? data.description : ""}</MDBCardText>
                        </MDBCol>
                        <br />


                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

    </div>
  )
}

export default Viewdonarp
