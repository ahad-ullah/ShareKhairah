import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import img from ".././images/defaultimg.png"

import "./Userprofile.css";

function Userimg() {


  const [images, setImages] = React.useState([]);

  const onChange = (imageList, addUpdateIndex) => {

    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
        maxFileSize={10000000}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt={img} style={{ marginTop: '-150px' }} width="140px" height="140px" />
                <div className="image-item__btn-wrapper">
                  {/* <button className="btn btn-outline-danger" style={{marginTop:'-50px'}} onClick={() => onImageRemove(index)}>Remove</button> */}
                </div>
              </div>
            ))}

            <button
              className="btn btn-outline-danger"



              onClick={onImageUpload}
              {...dragProps}
            >
              Change Photo
            </button>




          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default Userimg
