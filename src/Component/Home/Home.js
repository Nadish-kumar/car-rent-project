import React from 'react'
import "../Home/Home.css"
import {Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='container-fluid bg__image'>
        <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4 home__heading'>
                <h1>Retiko</h1>
                <h4>Rent your car !!! Enjoy your Ride</h4>
               <div className='btn__rep'>
                   <Link to="/admin-login">
                   <div>
                   <button className='button__rip' style={{textDecoration: "none", color:"white"}}>Post your car</button>
                   </div>
                   </Link>
                   <Link to="/login">
             <div>
             <button className='button__rip1'>Get your Car</button>
             </div>
             </Link>
               </div>
            </div>
            <div className='col-md-4'></div>
        </div>
    </div>
  )
}

export default Home

{/* <div className='col-md-6'>
<button className='button__rip'>Post your car</button>
</div>
<div className='col-md-6 '>
<button className='button__rip'>Get your car</button>
</div> */}