import React from 'react'
import "../AdminSign/AdminSign.css"
import car2 from "../../Assest/Img/car2.jpg"
import logo2 from "../../Assest/Img/logo2.jpg"
import { Modal } from "@material-ui/core";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import { useFormik } from 'formik';
import { useNavigate} from "react-router-dom"
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

const AdminSign = () => {

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleopen = () => setOpen(true)
  const [final, setfinal] = useState("");
  const [userdata, setvalues] = useState("");
  const [otp, setotp] = useState("");


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      country: '',
      phone: ""
    },
    onSubmit:async values => {
      // alert(JSON.stringify(values, null, 2));
      setvalues(values)
      var user = await axios
      .get("http://localhost:8001/admin")
      .then((res) => {
        return res.data;
      });
    console.log(values);
    const checkuser = await user.filter((data) => {
      return data.phone === parseInt(values.phone);
    });
    console.log(checkuser);
    if (checkuser.length === 0) {
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
      alert("This Number Already Register..");
    }
    },
  });

  const ValidateOtp = async () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then(async (result) => {
        alert("success");
        var usercreate = await axios
          .post("http://localhost:8001/admin", userdata)
          .then((res) => {
            return res.data;
          });
        if (usercreate != null) {
          sessionStorage.setItem("adminid", usercreate._id);
          navigate("/adminhome");
        }
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  return (
    <div className='container-fluid'>
    <div className='row'>
   
      <div className='col-md-6'>
        
        <img className='carimage' src={car2} />
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
             <h1>Admin Register</h1>
           </div>
           <div className='col-md-4'></div>
         </div>
         <form onSubmit={formik.handleSubmit}>
         <div className='row input__field'>
           <input type="text" className='form-control' placeholder='Name'      onChange={formik.handleChange} name="name"
       value={formik.values.name} />
         </div>
         <div className='row input__field'>
           <input type="email" className='form-control' placeholder='Email'      onChange={formik.handleChange}  name="email"
       value={formik.values.email}  />
         </div>
         <div className='row input__field'>
           <input type="text" className='form-control' placeholder='Country'      onChange={formik.handleChange}         name="country"
       value={formik.values.country}  />
         </div>
       
       
         <div className='row'>
           <div className='col-md-3'></div>
           <div className='col-md-6 input-group  input__field'>
             <input type="number" className="form-control"  placeholder='Phone Number'  onChange={formik.handleChange}         name="phone"
                      value={formik.values.phone} />
             <button className='btn btn-primary' type="submit">Send Otp</button>

          

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
                   type="submit"
                   onClick={ValidateOtp}
                  >
                    Sign
                  </Button>
                </Box>
              </Modal>
            </div>

           </div>
           <div className='col-md-3'></div>
         </div>
         <div className='row'>
           <div className='col-md-3'></div>
           <div className='col-md-6'>
           <div id="recaptcha-container"></div>
           </div>
           <div className='col-md-3'></div>
         </div>

         <div className='button'>
           <button className='btn__lo' type="submit">Login</button>
         </div>
         </form>
          </div>
          
    </div>
  </div>
  )
}

export default AdminSign