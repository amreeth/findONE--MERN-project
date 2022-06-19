import React, { useEffect, useState } from "react";
import "./after.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FormControl } from "react-bootstrap";
import axios from "../../utils/axios";
import CropImage from '../../Components/Cropper/CropImage'

const AfterRegScreen = () => {
  const [question, setQuestion] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [images, setImages] = useState({ image1: "", image2: "", image3: "" });
  const [result, setResult] = useState([]);
  
  const data = [];
  const handleQuestion = (ques, ans) => {
    let exist = data.filter((item) => {
      
      if (item.question === ques) {
        item.answer=ans
        return item;
      }
     
    });
    if (exist.length===0) {
      data.push({question:ques,answer:ans})
    }
    
  };


  const getAllQuestion = async () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("users/questions", config);
    setQuestion(data);
  };

  useEffect(() => {
    getAllQuestion();
  }, []);

  const userPersonal = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <form onSubmit={userPersonal}>
          <div className="row">
            <div className="col-md-6 p-2 ">
              <div className="question-wrapper bg-white  pt-2">
                <p className="text-center enter-details pt-3">Share with us</p>
                {question &&
                  question.map((item, index) => (
                    <div className="question p-3  pb-2">
                      <p>{item.question}?</p>
                      <div className="row">
                        <div className="col-6">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              value={item.option1}
                              name="3"
                              onChange={(e) =>
                                handleQuestion(item._id, item.option1)
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Default checkbox
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              value={item.option2}
                              name="3"
                              onChange={(e) =>
                                handleQuestion(item._id, item.option2)
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckChecked"
                            >
                              Checked checkbox
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              value={item.option3}
                              name="3"
                              onChange={(e) =>
                                handleQuestion(item._id, item.option3)
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Default checkbox
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              value={item.option4}
                              id="1"
                              name="3"
                              onChange={(e) =>
                                handleQuestion(item._id, item.option4)
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckChecked"
                            >
                              Checked checkbox
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-md-6 p-2">
              <div className="details-wrapper bg-white ">
                <p className="text-center enter-details pt-4">Enter details</p>
                <div className="row">
                  <div className="col-6 p-4">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Height"
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Weight"
                    />
                  </div>
                  <div className="col-6 p-4">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Location"
                    />
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Job"
                    />
                  </div>
                </div>
              </div>

              <div className="image-wrapper bg-white d-flex">
                <div className="row p-4">
                  <div className="col-4 img-or-ion  m-1 d-flex justify-content-center">
                   <label htmlFor="upload_image1">{image ? <img src={image} className='w-100' alt=""/> : <AddBoxIcon className="icons-question" /> }</label>
                    <FormControl
              className="crop_image d-none"
              id="upload_image1"
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
                    setImages({ ...images, image1: img });
                    setImage(img);
                    setResult([...result, images]);
                  }
                  if (image2 === null && image !== null) {
                    setImages({ ...images, image2: img });
                    setImage2(img);
                    setResult([...result, images]);
                  }
                  if (image3 === null && image2 !== null && image !== null) {
                    setImages({ ...images, image3: img });
                    setImage3(img);
                    setResult([...result, images]);
                  }
                  setShowCropper(false);
                }}
                closeHander={() => {
                  setShowCropper(false);
                }}
              />
            )}
                  </div>
                  <div className="col-4 img-or-icon m-1 d-flex justify-content-center" >
                  <label htmlFor="upload_image2">{image2 ? <img src={image2} className='w-100' alt=""/> : <AddBoxIcon className="icons-question" /> }</label>
                    <FormControl
              className="crop_image d-none"
              id="upload_image2"
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
                    setImages({ ...images, image1: img });
                    setImage(img);
                    setResult([...result, images]);
                  }
                  if (image2 === null && image !== null) {
                    setImages({ ...images, image2: img });
                    setImage2(img);
                    setResult([...result, images]);
                  }
                  if (image3 === null && image2 !== null && image !== null) {
                    setImages({ ...images, image3: img });
                    setImage3(img);
                    setResult([...result, images]);
                  }
                  setShowCropper(false);
                }}
                closeHander={() => {
                  setShowCropper(false);
                }}
              />
            )}
                    
                  </div>
                  <div className="col-4 img-or-icon m-1 d-flex justify-content-center">
                  <label htmlFor="upload_image3">{image3 ? <img src={image3} className='w-100' alt=""/> : <AddBoxIcon className="icons-question" /> }</label>
                    <FormControl
              className="crop_image d-none"
              id="upload_image3"
              type="file"
              name="crop_image3"
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
                    setImages({ ...images, image1: img });
                    setImage(img);
                    setResult([...result, images]);
                  }
                  if (image2 === null && image !== null) {
                    setImages({ ...images, image2: img });
                    setImage2(img);
                    setResult([...result, images]);
                  }
                  if (image3 === null && image2 !== null && image !== null) {
                    setImages({ ...images, image3: img });
                    setImage3(img);
                    setResult([...result, images]);
                  }
                  setShowCropper(false);
                }}
                closeHander={() => {
                  setShowCropper(false);
                }}
              />
            )}
                    </div>
                </div>
              </div>

              <button
                style={{ backgroundColor: "white" }}
                type="submit"
                class="btn  w-100 mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AfterRegScreen;
