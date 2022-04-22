import React from 'react'
import "../Login/Login.css"
import car1 from "../../Assest/Img/car1.jpg"
import logo2 from "../../Assest/Img/logo2.jpg"
import { Modal } from "@material-ui/core";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import {Link} from "react-router-dom"


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
             <div className='col-md-3'></div>
             <div className='col-md-6 input-group  input__field'>
               <input type="number" className="form-control" placeholder='Phone Number' />
               <button className='btn btn-primary' onClick={handleopen}>Send Otp</button>

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
                      // onChange={(e) => {
                      //   setotp(e.target.value);
                      // }}
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
                    
                    >
                      Login
                    </Button>
                  </Box>
                </Modal>
              </div>

             </div>
             <div className='col-md-3'></div>
           </div>
           <Link to="/sign">
           <div className='button'>
             <button className='btn__lo'>Register Now</button>
           </div>
           </Link>
        </div>
      </div>
    </div>
  )
}

export default Login