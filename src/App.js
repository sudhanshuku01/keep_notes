import { useState } from 'react';
import './App.css'
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/Notes/noteState';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Alert from './Component/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <NoteState showAlert={showAlert}>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <Routes>
      <Route path='/' element={<Home showAlert={showAlert}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup showAlert={showAlert}/>}/>
      <Route path='/login' element={<Login showAlert={showAlert}/>}/>

      </Routes>

    </Router>
    
    </NoteState>
  );
}

export default App;
