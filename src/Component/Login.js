import React,{ useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  const host="https://keep-notes-13sl.onrender.com"
    const [credential,setCredential]=useState({email:'', password:'' })
    let navigate=useNavigate();
   const handleSubmit= async (e)=>{
      e.preventDefault();
      const response=await fetch(`${host}/api/auth/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credential.email,password:credential.password})
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate('/')
        props.showAlert("Logined successfully","success")
      }else{
        alert('Invalid Credentials')
      }
   }
   const handlechange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
   }
  return (
  <>
  <form onSubmit={handleSubmit} className='container my-4 mx-auto form'>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input name='email' onChange={handlechange} value={credential.email} type="email" className="form-control" id="email" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credential.password} onChange={handlechange} name="password" id="password" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}
