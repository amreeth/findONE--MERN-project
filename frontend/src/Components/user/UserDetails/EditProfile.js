import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Message from "../../Message";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import {updateUserProfile} from '../../../actions/userActions'
import Loader from "../../Loader";

const EditProfile = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [refresh, setRefresh] = useState(false)


  const {
    userLogin: { userInfo },
  } = useSelector((state) => state);
  // console.log(userInfo,'userinfo edit profile');

  const dispatch=useDispatch()

  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error, success, user} = updateProfile;

  console.log(updateProfile);
  // console.log(user);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    const { name,phonenumber, dob, gender, oppGender } = data;
    // console.log(data);
    dispatch(
      updateUserProfile({name,phonenumber,dob,gender,oppGender,})
    );  
  }


  useEffect(() => {
    if(success){
      setRefresh(true)
    }
  }, [success])
  
  
  return (
    <>
      <Button style={{color:"black"}} onClick={handleShow}>
        Edit profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {loading &&<Loader></Loader>}
          {error && <Message varinat="danger">{error}</Message>}
          {success && <Message varinat="success">{user.message}</Message>}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitForm)}
            sx={{ mt: 3 }}
          >
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                placeholder={userInfo.name}
                fullWidth
                id="firstname"
                label=" Name"
                autoFocus
                {...register("name", {
                  // required: "This field cannot be blank",
                  validate: {
                    nospace: (value) => {
                      if (value[0] !== " ") return true;
                      else return "First letter should not be space";
                    },
                    nospecial: (value) => {
                      var hasNumber = /\d/;
                      if (hasNumber.test(value))
                        return "Should contain letters only";
                      else return true;
                    },
                  },
                })}
                error={!!errors?.name}
                helperText={errors?.name ? errors?.name.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phonenumber"
                placeholder={userInfo.phonenumber}
                autoComplete="phonenumber"
                {...register("phonenumber", {
                  // required: "Phone number is required",
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                error={!!errors?.phonenumber}
                helperText={
                  errors?.phonenumber ? errors.phonenumber.message : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dob"
                type="date"
                name="date"
                placeholder={userInfo.dob}
                autoComplete="date"
                {...register("dob", {
                  // required: "date of birth is required",
                })}
                error={!!errors?.dob}
                helperText={errors?.dob ? errors.dob.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              +<InputLabel id="demo-simple-select-label">I am</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                fullWidth
                placeholder={userInfo.gender}
                id="demo-simple-select"
                {...register("gender", {
                  // required: "select one option",
                })}
                error={!!errors?.gender}
                helperText={errors?.gender ? errors.gender.message : ""}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              +
              <InputLabel id="demo-simple-select-label">Looking for</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                fullWidth
                placeholder={userInfo.oppGender}
                id="demo-simple-select"
                {...register("oppGender", {
                  // required: "select one option",
                })}
                error={!!errors?.oppGender}
                helperText={errors?.oppGender ? errors.oppGender.message : ""}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
