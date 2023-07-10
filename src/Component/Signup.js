import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const host="https://keep-notes-13sl.onrender.com"
    const [credential,setCredential]=useState({name:'',email:'', password:'',confirmpassword:'' })
    let navigate=useNavigate();
   const handleSubmit= async (e)=>{
      e.preventDefault();
      if(credential.password!==credential.confirmpassword){
        props.showAlert("Password and Confirm Password should be same","danger");
        return 
      }
      const response=await fetch(`${host}/api/auth/createuser`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate('/')
        props.showAlert("Signuped successfully","success")
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
    <label htmlFor="name" className="form-label">Name</label>
    <input name='name' onChange={handlechange} value={credential.name} type='text' className="form-control" id="name" />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input name='email' onChange={handlechange} value={credential.email} type="email" className="form-control" id="email" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Enter Password</label>
    <input name='password' onChange={handlechange} value={credential.password} type="password" className="form-control" id="password" />
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
    <input  type="password" className="form-control" value={credential.confirmpassword} onChange={handlechange} name="confirmpassword" id="confirmpassword" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
   
   </>
  )
}
