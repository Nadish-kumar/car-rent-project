import React from 'react'
import "../File/File.css"
import car1 from "../../Assest/Img/vertical banner.jpg"
import car2 from "../../Assest/Img/banner3.jpg"
import { useState,useEffect } from 'react'
import axios from "axios"
import { firebase } from "../../Database/Firebase"


const File = () => {
  const [imageurl, setimageurl] = useState(null);
  const [imageurl22, setimageurl22] = useState(null);
  const [imageurl33, setimageurl33] = useState(null);

  const getimgaeurl = async () => {
    var file = document.getElementById("liscence").files;
    let file11 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("profile/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl = await file11;
    console.log(imgurl)
    setimageurl(imgurl);
   
  };
  console.log(imageurl)

  const getimgaeurl22 = async () => {
    var file = document.getElementById("aadhar").files;
    let file11 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("profile/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl = await file11;
    console.log(imgurl)
    setimageurl22(imgurl);
   
  };
  console.log(imageurl22)

  const getimgaeurl33 = async () => {
    var file = document.getElementById("pic").files;
    let file11 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("user/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl = await file11;
    console.log(imgurl)
    setimageurl33(imgurl);
   
  };
  console.log(imageurl33)

    
    var totalref = sessionStorage.getItem("total")
    console.log(totalref)

    useEffect(() => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
  
      document.body.appendChild(script);
    }, [])
    
   var userid = sessionStorage.getItem("userid")
    const payAmount =async () => {
  
      axios
          .post("https://car-rent-backend.herokuapp.com/razorpay/payment", {
            amount: totalref,
          })
          .then(async (res) => {
            if (res.data.status === "success") {
              const id = await res.data.sub.id;
              pay(id, totalref);
              getready()
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
            }
          });
      };
      const getready = async() => {
        var filedetailes = {
          liscence:imageurl,
          aadhar:imageurl22,
          pic:imageurl33,
          userid:userid,
         }
         console.log(filedetailes)
         var postdata = await axios.post("https://car-rent-backend.herokuapp.com/report",filedetailes).then((res) => { return res.data})
         console.log(postdata) 
      }

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
                <input type="file" className='form-control' id="liscence" onChange={getimgaeurl} />
                <label className='repheading'>Upload your Aadhar</label>
                <input type="file" className='form-control' id="aadhar" onChange={getimgaeurl22} />
                <label className='repheading'>Upload your Photo</label>
                <input type="file" className='form-control' id="pic"  onChange={getimgaeurl33}/>
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