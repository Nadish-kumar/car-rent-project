import React from 'react'
import "../File/File.css"
import car1 from "../../Assest/Img/vertical banner.jpg"
import car2 from "../../Assest/Img/banner3.jpg"
import { useState,useEffect } from 'react'
import axios from "axios"


const File = () => {
    
    var totalref = sessionStorage.getItem("total")
    console.log(totalref)

    useEffect(() => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
  
      document.body.appendChild(script);
    }, [])
    

    const payAmount = () => {
        axios
          .post("http://localhost:8001/razorpay/payment", {
            amount: totalref,
          })
          .then(async (res) => {
            if (res.data.status === "success") {
              const id = await res.data.sub.id;
              pay(id, totalref);
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
            }
          });
      };

      const pay = (id, amount) => {
        console.log(id, amount);
        var options = {
          key: "rzp_test_WVu8bni55PVN2d",
          currency: "INR",
          name: "Razorpay",
          description: "Food cost",
          image: { car1 },
          order_id: id,
          handler: async function (response) {
            console.log(response);
            alert("Your car is Booked");
    
            // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            //   response;
            // await axios
            //   .post("http://localhost:3000/order/create", {
            //     razorpay_order_id: razorpay_order_id,
            //     razorpay_payment_id: razorpay_payment_id,
            //     razorpay_signature: razorpay_signature,
            //     amount: total,
            //
            //   })
            //   .then((res) => {
            //     console.log(res);
            //   });
          },
          theme: {
            color: "#227269",
          },
        };
        var rzp = new window.Razorpay(options);
        rzp.open();
      };

   
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-3'>
                <img src={car1} className="verticla__img" />
            </div>
            <div className='col-md-6'>
                <h1>Fill your Details</h1>
                <label className='repheading'>Upload your Liscence</label>
                <input type="file" className='form-control' />
                <label className='repheading'>Upload your Aadhar</label>
                <input type="file" className='form-control' />
                <label className='repheading'>Upload your Photo</label>
                <input type="file" className='form-control' />
                <button className='btn btn-success mt-3' onClick={payAmount}>Pay {totalref}</button>
            </div>
            <div className='col-md-3'>
                <img src={car2} className="verticla__img" />
            </div>
        </div>
    </div>
  )
}

export default File