import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// import Navbar from '../components/Navbar';

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  // let [address, setAddress] = useState("");
  let navigate = useNavigate()

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   let navLocation = () => {
  //     return new Promise((res, rej) => {
  //       navigator.geolocation.getCurrentPosition(res, rej);
  //     });
  //   }

  //   let latlong = await navLocation().then(res => {
  //     let latitude = res.coords.latitude;
  //     let longitude = res.coords.longitude;
  //     return [latitude, longitude]
  //   })

  //   let [lat, long] = latlong
  //   console.log(lat, long)
  //   const response = await fetch("http://localhost:5000/api/getlocation", {
  //     // credentials: 'include',
  //     Origin: "http://localhost:3000/login",
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ latlong: { lat, long } })
  //   });

  //   const { location } = await response.json()
  //   console.log(location);
  //   setAddress(location);
  //   setCredentials({ ...credentials, [e.target.name]: location })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      // credentials: 'include',
      // Origin: "http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json)

    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/login")
    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("")', backgroundSize: 'cover', height: '100vh', margin: "50px"}}>
      {/* <div>
        <Navbar />
      </div> */}
      {/* <hr/> */}
        <div className="container" >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>

              <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
              {/* <fieldset>
              <input type="text" className="form-control" name='address' placeholder='"Click here for fetching address"' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
            </fieldset> */}
            </div>
            {/* <div className="m-3">
            <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
          </div> */}
            <div className="m-3">
            </div>
            {/* <hr /> */}
            <button type="submit" className="btn m-3 btn-success">Submit</button>
            <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
          </form>
        </div>
        {/* <hr/> */}
      </div>
  

  )
}
