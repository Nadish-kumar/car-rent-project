import React from 'react'
import "../Adminhome/Adminhome.css"
import car1 from "../../Assest/Img/vertical banner.jpg"
import car2 from "../../Assest/Img/banner3.jpg"
import axios from "axios"
import { firebase } from "../../Database/Firebase";
import {storage} from "../../Database/Firebase"
import { useState } from 'react';

const Adminhome = () => {
    const [imageurl, setimageurl] = useState(null);
    const [imageurl33, setimageurl33] = useState(null);

    const getimgaeurl = async () => {
        var file = document.getElementById("img").files;
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

      const getimgaeurl23 = async () => {
        var file = document.getElementById("rc").files;
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
        setimageurl33(imgurl);
       
      };
      console.log(imageurl33)

    var postid = (Math.random() + 1).toString(36).substring(5).toUpperCase()
    console.log(postid)
    
    var adminid = sessionStorage.getItem("adminid")
    console.log(adminid)

    const getpostdata = async() => {
        var model = document.getElementById("model").value
        var brand = document.getElementById("brand").value
        var amount = document.getElementById("amount").value
        var desc = document.getElementById("desc").value
      var data = {
          model : model,
          brand: brand,
          amount : amount,
          img: imageurl,
          adminid : adminid,
          rc : imageurl33,
          desc:desc,
          postid:postid
       }
       var response = await axios.post("http://localhost:8001/car",data).then((res) => { return res.data})
       console.log(response)
    }

  return (
    <div className='container'>
        <div className='row repbody'>
            <div className='col-md-3'>
                <img className='vertical__img' src={car1} alt="car1" />
            </div>
            <div className='col-md-6'>
                <h1>Post your car & earn Money</h1>
                
                <label className='repheading'>Car Model</label>
                <input type="text" className='form-control' id="model"
       
         name="model"/>
                <label className='repheading'>Car Brand</label>
                <input type="text" className='form-control' id="brand" 
         
         name="brand"/>
                <label className='repheading'>Upload the car image</label>
                <input type="file" className='form-control' id="img" onChange={getimgaeurl}   
 
         name="img" />
                 <label className='repheading'>Upload the car RC</label>
                <input type="file" className='form-control' id="rc" onChange={getimgaeurl23}
         
         name="rc" />
                <label className='repheading'>Rent for one day</label>
                <input type="number" className="form-control"  id="amount" name="amount"/>

                <label className='repheading'>Description about your car</label>
                <input type="number" className="form-control"  id="desc" name="desc"/>

                <button className='btn btn-success mt-3 btn-lg' onClick={getpostdata}>Submit</button>
             
            </div>
            <div className='col-md-3'>
                <img src={car2} className='vertical__img' alt="car2" />
            </div>
        </div>
    </div>
  )
}

export default Adminhome