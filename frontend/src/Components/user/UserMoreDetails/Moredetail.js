import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {} from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FormControl } from "react-bootstrap";
import CropImage from "../../Cropper/CropImage";
import Tooltip from "@mui/material/Tooltip";

const Moredetail = () => {
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

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
              accept=".jpg,.jpeg,.png,"
            />
            <div className="text-center">
              {" "}
              <label for="upload_image">
                {" "}

                {/* <p className="h2  mx-auto"></p> */}

                <Tooltip title="Add picture" disableInteractive>
                  {/* <Avatar
                          alt="user"
                          className=""
                          sx={{ height: "10vmax", width: "10vmax" }}
                        /> */}
                  <p>add picture</p>

                </Tooltip>
              </label>
            </div>

            {showCropper && (
              <CropImage
                src={cropImage}
                imageCallback={(image) => {
                  setImage(image);
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
                className="border shadow rounded"
                src={image}
                height="auto"
                width="100%"
              />
            )}
          </Col>
        </Row>
    
      </Container>
    </>
  );
};

export default Moredetail;
