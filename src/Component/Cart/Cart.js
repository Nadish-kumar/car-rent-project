import React from 'react'
import "../Cart/Cart.css"
import { useEffect,useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [onedata, setonedata] = useState([])
  const [quanity, setquanity] = useState([])
  const [total, settotal] = useState([])
  const params = useParams()
  useEffect(() => {
    getonedata()
  }, [])

  const getonedata =  async() => {
    var response  = await axios.get(`https://car-rent-backend.herokuapp.com/car/${params.postid}`).then((res) => {return res.data})
    setonedata(response)
    

  }

  const getquanity = () => {
    var quanity = document.getElementById("brand").value
    setquanity(quanity)
    var total = quanity * onedata[0].amount
    settotal(total)
  }

  console.log(onedata)
  sessionStorage.setItem("total",total)
  
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 moto'>
          <h1>Your cart</h1>
          <table class="table table-striped">
             <thead>
               <tr>
                 
                 <th>Model</th>
                 <th>Brand</th>
                 <th>Days</th>
                 <th>Amount</th>
                 <th>Total amount</th>
               </tr>
             </thead>
             <tbody>
               {
                 onedata.length != 0 ? onedata.map((item,index) => (
                  <tr>
              
                  <th>{item.model}</th>
                  <th>{item.brand}</th>
                  <th><input type="number" id="brand" onChange={getquanity}/></th>
                  <th>{item.amount}</th>
                  <th>{total}</th>
                </tr>
                 )) : null
               }
           
             </tbody>
         </table>
         <div className='row'>
          <div className='col-md-9'></div>
          <div className='col-md-3'>
            <Link to="/file">
            <button className='btn btn-success btn-lg'>Pay Now & Check out</button>
            </Link>
          </div>
        </div>
        </div>
    
      </div>
    </div>
  )
}

export default Cart