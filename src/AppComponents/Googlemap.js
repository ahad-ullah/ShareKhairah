import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { useState, Component , createContext } from 'react';
import { useLocation } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

const DataContext = createContext();

export class Googlemap extends Component {
  
  constructor() {
    super();
    this.state = {
     // address: "" ,
     // fname: '',
    //email:'',
    //about:'',
    //message:'',
      mapCenter: {
        lat: 31.5204,
        lng: 74.3587,
      },
    };

    
  }


  


  handleChange = (address) => {
    this.setState({ address });
   
  };

 

  selectLocation = (e) => {
    if (this.state.address != "") {
      this.props.handleAddress(this.state.address) ;
      this.props.handleNext();
      return true;
    } else {
      e.preventDefault();
      alert("Please Enter Location");
      return false;
    }
  };

  handleSelect = (e) => {
    geocodeByAddress(e)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({ address:e });
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
      

      
  };


  backlocation = (e) => {
    this.props.handleBack();
  };

 userData = ()=>{
  
}

  render() {
   
    const styles = {
      marginRight: "5px",
      height: "70vh",
      width: "90%",
      marginLeft: this.props.user.userRole == "Donee" ? "75px" : "0px",
    };

  

    

    const style1 = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "50px",
      marginTop: this.props.user.userRole == "Donee" ? "30px" : "0px",
    };

    return (

      
      <div id="googleMap">
          


        <div style={style1}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
           
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        required
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
     
        <Map
          style={styles}
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
          />
          {this.props.user.userRole == "Doner" && (
            <button
              type="button"
              onClick={this.backlocation}
              className="btn btn-outline-danger"
              style={{ marginTop: "500px", width: "150px" }}
            >
              Back
            </button>
          )}
          {this.props.user.userRole == "Doner" && (
            <button
              type="button"
              onClick={this.selectLocation}
              className="btn btn-outline-danger"
              style={{
                marginTop: "500px",
                marginLeft: "600px",
                width: "150px",
              }}
            >
              Next
            </button>
          )}

          {this.props.user.userRole == "Donee" && (
            <button
              type="button"
              onClick={this.userdata}
              className="btn btn-outline-danger"
              style={{
                marginTop: "500px",
                marginLeft: "680px",
                width: "100px",
              }}
            >
              Next
            </button>
          )}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDLn7JG3ZHQNy8-G_Py7HlM6RJbnjY_wVY",
})(connect(mapStateToProps)(Googlemap));