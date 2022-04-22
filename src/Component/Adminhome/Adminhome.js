import React from 'react'
import "../Adminhome/Adminhome.css"
import car1 from "../../Assest/Img/vertical banner.jpg"
import car2 from "../../Assest/Img/banner3.jpg"
import { useFormik } from 'formik';
import axios from "axios"

const Adminhome = () => {

    var postid = (Math.random() + 1).toString(36).substring(5).toUpperCase()
    console.log(postid)
    const formik = useFormik({
        initialValues: {
          model: '',
          brand: '',
          img: '',
          amount: '',
          postid: postid,
        },
        onSubmit:async values => {
        
        var response = await axios.post("http://localhost:5000/car",values).then((res) => { return res.data})
       alert("Your car is successfully posted")
        },
      });

  return (
    <div className='container'>
        <div className='row repbody'>
            <div className='col-md-3'>
                <img className='vertical__img' src={car1} alt="car1" />
            </div>
            <div className='col-md-6'>
                <h1>Post your car & earn Money</h1>
                <form onSubmit={formik.handleSubmit}> 
                <label className='repheading'>Car Model</label>
                <input type="text" className='form-control'    onChange={formik.handleChange}
         value={formik.values.model} 
         name="model"/>
                <label className='repheading'>Car Brand</label>
                <input type="text" className='form-control'    onChange={formik.handleChange}
         value={formik.values.brand}  
         name="brand"/>
                <label className='repheading'>Upload the car image</label>
                <input type="file" className='form-control'    onChange={formik.handleChange}
         value={formik.values.img} 
         name="img" />
                <label className='repheading'>Rent for one day</label>
                <input type="number" className="form-control"    onChange={formik.handleChange}
         value={formik.values.amount} 
         name="amount"/>
                <button className='btn btn-success mt-3 btn-lg' type='submit'>Submit</button>
                </form>
            </div>
            <div className='col-md-3'>
                <img src={car2} className='vertical__img' alt="car2" />
            </div>
        </div>
    </div>
  )
}

export default Adminhome