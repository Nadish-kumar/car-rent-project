import React from 'react'
import "../Firstpage/Firstpage.css"
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Firstpage = () => {
  const [car, setcar] = useState([])
  useEffect(() => {
   getalldata()
  }, [])

  const getalldata = async() => {
    var response = await axios.get("http://localhost:8001/car").then((res) => { return res.data})
    console.log(response)
    setcar(response)
  }
  console.log(car)
  return (
    <div className='container'>
      <div className='row'>
        {
           car.length !== 0 ? car.map((item,index) => (
            <div className='col-md-4' key={index}>
            <div class="card">
                  <img src={item.img} class="card-img-top" alt="..." />
                     <div class="card-body">
                <h5 class="card-title">{item.brand}</h5>
               <p class="card-text">{item.desc}</p>
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
  )
}

export default Firstpage