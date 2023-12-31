import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Trolley from '../trolley.svg'
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import "../Navbar.css";


export default function Navbar() {
const [cartView, setCartView] = useState(false)
localStorage.setItem('temp', "first")   //
const navigate = useNavigate();
let data = useCart();

const handleLogOut = ()=>{
  localStorage.removeItem("authToken");
  navigate("/login")
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger position-sticky" style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic fw-bold" to="/">HungryHub</Link>    
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/" style={{marginTop: "9px"}}>Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder" style={{marginTop: "9px"}}>My Orders</Link>
                </li>
                : ""}
            </ul>

            {!(localStorage.getItem("authToken")) ?
              <form d-flex>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
              </form>
              :

              <div>
                 <div className="btn bg-white text-danger mx-1" onClick={()=>{setCartView(true)}} style={{marginTop:"1px"}}>  
                 Cart 
                 <img src={Trolley} alt="" style={{height:"21px", marginBottom:"4px"}}/> {"    "}
                   <span className = "badge pill bg-danger" >{data.length}</span>
                 </div>
             {cartView? <Modal onClose={()=>setCartView(false)} ><Cart></Cart></Modal>:null}

                 <div className="btn bg-white text-danger mx-1"  onClick={handleLogOut}>
                   Log Out
                 </div>
               </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
