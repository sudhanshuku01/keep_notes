import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    let location=useLocation();
    let navigate=useNavigate();
    useEffect(()=>{
    },[location])
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">KeepNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {!localStorage.getItem('token')?<div>
      <button type="button" className="btn btn-primary authbutton"><Link to='/signup' className="link-warning link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Signup</Link></button>
      <button type="button" className="btn btn-primary mx-3 authbutton"><Link to='/login' className="link-warning link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Login </Link></button>
      </div>:<div>
      <button onClick={handleLogout} type="button" className="btn btn-primary mx-3 authbutton"><Link className="link-warning link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Logout</Link></button>
      </div>
      }
    </div>
  </div>
</nav>
    </>
  )
}
