import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { registers } from "../../actions/userActions";
import Loader from "../../Components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormControl } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import CropImage from "../../Components/Cropper/CropImage";

import "./RegisterScreen.css";

const theme = createTheme();

export default function Log() {

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, success } = userRegister;

  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  // console.log(image);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();



function submitForm(data) {
    const {
      name,
      email,
      phonenumber,
      dob,
      gender,
      oppGender,
      password,
      cpassword,
      
    } = data;

    dispatch(
      registers({
        name,
        email,
        phonenumber,
        image,
        dob,
        gender,
        oppGender,
        password,
        cpassword,
      })
    );
  };

  React.useEffect(() => {
    if (success) {
      navigate("/before");
    }
  }, [success]);

  return (
    <div className="registerForm">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              SIGN UP
            </Typography>

            {error?.status && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error.message ? error.message : "Error"}
              </Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(submitForm)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/*///////////////////////////// imageuplod////////////////////// */}

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
                      <span class="profilepic__icon">
                        {" "}
                        <p className="h2  mx-auto">
                        <Tooltip title="Add profile picture">
                          <Avatar
                            src={image}
                            alt="user"
                            className="border shadow"
                            sx={{ height: "10vmax", width: "10vmax" }}
                          />
                          </Tooltip>
                        </p>
                      </span>
                      
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

                {/*///////////////////////////// imageuplod////////////////////// */}

                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="firstname"
                    label=" Name"
                    autoFocus
                    {...register("name", {
                      required: "This field cannot be blank",
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : ""}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    {...register("phonenumber", {
                      required: "Phone number is required",
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
                    autoComplete="date"
                    {...register("dob", {
                      required: "date of birth is required",
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
                    id="demo-simple-select"
                    {...register("gender", {
                      required: "select one option",
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
                  <InputLabel id="demo-simple-select-label">
                    Looking for
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    fullWidth
                    id="demo-simple-select"
                    {...register("oppGender", {
                      required: "select one option",
                    })}
                    error={!!errors?.oppGender}
                    helperText={
                      errors?.oppGender ? errors.oppGender.message : ""
                    }
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 letter required",
                      },
                    })}
                    error={!!errors?.password}
                    helperText={errors?.password ? errors.password.message : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm password"
                    type="password"
                    id="cpassword"
                    autoComplete="new-password"
                    {...register("cpassword", {
                      required: "Password is required",
                      validate: {
                        matchpass: (value) => {
                          if (getValues().password === value) return true;
                          else return "Password should match";
                        },
                      },
                    })}
                    error={!!errors?.cpassword}
                    helperText={
                      errors?.cpassword ? errors.cpassword.message : ""
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/">
                    <Typography>
                       Already have an account? Log in
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
