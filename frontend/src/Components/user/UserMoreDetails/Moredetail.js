import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import { FormControl } from "react-bootstrap";
import CropImage from "../../Cropper/CropImage";
import Tooltip from "@mui/material/Tooltip";
import { Typography, Button } from "@mui/material";
import axios from 'axios'
import {useAlert} from 'react-alert'

const Moredetail = () => {

  const alert  = useAlert()
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [images,setImages] = useState({image1:"",image2:"",image3:""})
  const [result,setResult] = useState([])


  const imageUpload = async (e) => {
   

    try {
      let userInfo = await localStorage.getItem("userInfo");

      userInfo = JSON.parse(userInfo);
      const config = {
        headers: {
          "Content-Length" :result.length ,
         "Content-Type": "application/json; charset=utf-8"
        },
      };
      console.log(result);
      const {data} = await axios.post('http://localhost:4000/api/users/multipleimages',result,config)
  
    } catch (error) {

      console.log(error);
    }

   

  };

  return (
    <>
      <Container>
        
          <Row>
            <Grid item xs={12}>
              <FormControl
                className="crop_image d-none"
                id="upload_image"
                type="file"
                name="crop_image"
                required
                onChange={(e) => {
                  setCropImage(e.target.files[0]);
                  setShowCropper(true);
                }}
                accept=".jpg, .jpeg, .png,"
              />

              {showCropper && (
                <CropImage
                  src={cropImage}
                  imageCallback={(img) => {
                    if (image === null) {
                     setImages({...images,image1:img})
                     setImage(img)
                      setResult([...result,images])
                    }
                    if (image2 === null && image !== null) {
                      setImages({...images,image2:img})
                      setImage2(img) 
                      setResult([...result,images])
                    }
                    if (image3 === null && image2 !== null && image !== null) {
                      setImages({...images,image3:img})  
                      setImage3(img) 
                      setResult([...result,images])
                    }
                    setShowCropper(false);
                  }}
                  closeHander={() => {
                    setShowCropper(false);
                  }}
                />
              )}
            </Grid>
          </Row>

          <Row>
            <Col className=" my-2" lg={4}>
              {image && (
                <img
                  className="mx-1 shadow rounded "
                  src={image}
                  height="auto"
                  width="100%"
                  alt=""
                />
              )}
            </Col>
            <Col className=" my-2" lg={4}>
              {image2 && (
                <img
                  className="mx-1 shadow rounded"
                  src={image2}
                  height="auto"
                  width="100%"
                  alt=""
                />
              )}
            </Col>
            <Col className=" my-2" lg={4}>
              {image3 && (
                <img
                  className="mx-1 shadow rounded"
                  src={image3}
                  height="auto"
                  width="100%"
                  alt=""
                />
              )}
              {!image3 && (
                <div className=" mx-1 text-center">
                  {" "}
                  <label for="upload_image">
                    {" "}
                    {/* <p className="h2  mx-auto"></p> */}
                    <Tooltip title="Add picture" disableInteractive>
                      <img
                        className="mx-1 shadow rounded"
                        src="https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png"
                        width={"220"}
                        alt=""
                      />
                      {/* <p>add picture</p> */}
                    </Tooltip>
                  </label>
                </div>
              )}
            </Col>
          </Row>
          {image ? <Button onClick={imageUpload}>Save</Button> : ""}
      </Container>
    </>
  );
};

export default Moredetail;
