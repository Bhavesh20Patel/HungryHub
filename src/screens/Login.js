import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert("Enter Valid Credentials")
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>

      <div className="container" style={{marginTop:"50px"}} >
       
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              {/* <header>Login</header> */}
              <label htmlFor="exampleInputEmail1" className="form-label" style={{color:"black"}}>Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>

            <button type="submit" className="btn m-3 btn-success">Login</button>
            <Link to="/signup" className="m-3 btn btn-danger sign">I am a new User</Link>
          </form>
        </div>

      </div>
   
  )
}
