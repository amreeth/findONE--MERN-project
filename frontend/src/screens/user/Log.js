import * as React from "react";
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



const theme = createTheme();

export default function Log() {

  const navigate = useNavigate();
  
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo,success } = userRegister;

  const dispatch = useDispatch();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const submitForm = (data) => {

    console.log(data);

    const {name,email,phonenumber,dob,gender,oppGender,password,cpassword}=data

    dispatch(
      registers({ name,email,phonenumber,dob,gender,oppGender,password,cpassword})
    );
  };


  React.useEffect(() => {
    if(success){
      navigate('/before')
    }
  }, [success])
  

  return (
    <React.Fragment>
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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

                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
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
                    helperText={
                      errors?.name ? errors?.name.message : ""
                    }
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
                    helperText={errors?.phonenumber ? errors.phonenumber.message : ""}
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
               
                <Grid item xs={12}>+
                
                  <InputLabel id="demo-simple-select-label">I am</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    fullWidth
                    id="demo-simple-select"
                    {...register("gender",{
                        required: "select one option"
                     })}
                     error={!!errors?.gender}
                    helperText={errors?.gender ? errors.gender.message : ""}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    
                  </Select>
                </Grid>


                <Grid item xs={12}>+
                
                <InputLabel id="demo-simple-select-label">Looking for</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  id="demo-simple-select"
                  {...register("oppGender",{
                      required: "select one option"
                   })}
                   error={!!errors?.oppGender}
                  helperText={errors?.oppGender ? errors.oppGender.message : ""}
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
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
