import React from 'react'
import "../Login/Login.css"
import car1 from "../../Assest/Img/car1.jpg"
import logo2 from "../../Assest/Img/logo2.jpg"
import { Modal } from "@material-ui/core";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import {Link} from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { firebase, auth } from "../../Database/Firebase";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "#f9f9fb",
  border: "2px solid #000",
  borderRadius: "35px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};


const Login = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleopen = () => setOpen(true)
  const [otp, setotp] = useState("");
  const [final, setfinal] = useState("");
  const [uservalue, setuservalue] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: '',

    },
    onSubmit:async values => {
    
      var user = await axios
      .get("https://car-rent-backend.herokuapp.com/user")
      .then((res) => {
        return res.data;
      });
    const checkuser = await user.filter((data) => {
      return data.phone === parseInt(values.phone);
    });
    if (checkuser.length !== 0) {
      setuservalue(checkuser[0]);
      var finalnumber = "+91" + values.phone;
      let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
      auth
        .signInWithPhoneNumber(finalnumber, verify)
        .then((result) => {
          setfinal(result);
          alert("code sent");
          setOpen(true);
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    } else {
      alert("Not Valid User..please Register");
    }
    },
  });
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        alert("login successfully");
        sessionStorage.setItem("userid", uservalue._id);
        navigate("/product");
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <img className='carimage' src={car1} />
        </div>
        <div className='col-md-6'>
          <div className='row '>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
            <img className='logo__image' src={logo2} />
            </div>
            <div className='col-md-4'></div>
           </div>
           <div className='row'>
             <div className='col-md-4'></div>
             <div className='col-md-4'>
               <h1>Login</h1>
             </div>
             <div className='col-md-4'></div>
           </div>
           <div className='row'>
             <form onSubmit={formik.handleSubmit} >
             <div className='col-md-3'></div>
             <div className='col-md-6 input-group  input__field'>
               <input type="number" className="form-control" placeholder='Phone Number'   onChange={formik.handleChange}
         value={formik.values.phone} name="phone" />
               <button className='btn btn-primary' type="submit" >Send Otp</button>

               <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      className="otp__header"
                    >
                      OTP Verification
                    </Typography>

                    <TextField
                      id="standard-basic"
                      variant="standard"
                      className="otp__number"
                      onChange={(e) => {
                        setotp(e.target.value);
                      }}
                    />
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      className="otp__subheading"
                    >
                      If you doesn't receive code<span> Resend</span>
                    </Typography>

                    <Button
                      variant="contained"
                      className="otp__button"
                      onClick={ValidateOtp}
                    >
                      Login
                    </Button>
                  </Box>
                </Modal>
              </div>
           </div>
           <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                <div id="recaptcha-container"></div>
                </div>
                <div className='col-md-3'></div>

              </div>
             </form>
             <div className='col-md-3'></div>

           </div>
          
           <div className='button'>
             <button className='btn__lo'>Register Now</button>
           </div>
         
        </div>
      </div>
    </div>
  )
}

export default Login