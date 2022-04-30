import React from 'react'
import "../Firstpage/Firstpage.css"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Firstpage = () => {
  const navigate = useNavigate()
  const [car, setcar] = useState([])
  useEffect(() => {
   getalldata()
  }, [])

  const getalldata = async() => {
    var response = await axios.get("https://car-rent-backend.herokuapp.com/car").then((res) => { return res.data})
    console.log(response)
    setcar(response)
  }
  console.log(car)

  const logout = () => {
    sessionStorage.clear();
    navigate("/")
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 '>
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height: "100vh"}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use></use></svg>
      <span class="fs-4">Choose your car</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>
         
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use ></use></svg>
          
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>
          
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi me-2" width="16" height="16"><use></use></svg>
          
        </a>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a href="#" onClick={logout} class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
        <strong>sign out</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
        </div>
        <div className='col-md-9'>
          <div className='row'>
        {
           car.length !== 0 ? car.map((item,index) => (
            <div className='col-md-4' key={index}>
            <div class="card">
                  <img src={item.img} class="card-img-top" className='img__cards' alt="..." />
                     <div class="card-body">
                <h5 class="card-title">{item.brand}</h5>
               <p class="card-text">{item.desc}</p>
               <p class="card-text">{item.phone}</p>
               <Link
            to={{ pathname: `/cart/${item.postid}` }}
            style={{ color: "white", textDecoration:"none" }}
                          >
             <a class="btn btn-primary">{item.amount}</a>
             </Link>
          </div>
    </div>
            </div>
           )) : null
        }
        </div>
     </div>
      </div>
      <div className='row'>
      <footer class="bg-dark text-center text-white">

  <div class="container p-4 pb-0">
   
    <section class="">
      <form action="">
       
        <div class="row d-flex justify-content-center">
         
          <div class="col-auto">
            <p class="pt-2">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>

          <div class="col-md-5 col-12">
           
            <div class="form-outline form-white mb-4">
              <input type="email" id="form5Example29" class="form-control" />
              <label class="form-label" for="form5Example29">Email address</label>
            </div>
          </div>
       
          <div class="col-auto">
        
            <button type="submit" class="btn btn-outline-light mb-4">
              Subscribe
            </button>
          </div>
        
        </div>
      
      </form>
    </section>
  
  </div>

  <div class="text-center p-3">
    © 2020 Copyright:
    <a class="text-white" href="https://mdbootstrap.com/">Retiko.com</a>
  </div>
 
</footer>
      </div>
    </div>
  )
}

export default Firstpage