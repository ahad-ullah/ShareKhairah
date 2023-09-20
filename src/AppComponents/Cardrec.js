import React from 'react'
import {  Link } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBTypography,
    MDBIcon
  } from 'mdb-react-ui-kit';
  import "./Cardrec.css";

function Cardrec(props) {
const data = props.list;
  return (
    <div>

<MDBContainer className="py-3">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol xl="6">
            <MDBCard  style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
              <Link to= '/Viewdonarp' state={{ data }} >
                  <MDBTypography className="hover-effect" tag="h3">
                    {props.list.status}
                  </MDBTypography>
                </Link>
                <hr className="my-4" />
                <div className="d-flex justify-content-start align-items-center">
                  <MDBCardText className="text-uppercase mb-0">
                   Details
                  </MDBCardText>
                  <MDBCardText className="text-uppercase mb-0">
                    <MDBIcon fas icon="link ms-4 me-2" /> <span className="text-muted small">{props.list.description}</span>
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    </div>
  )
}

export default Cardrec
