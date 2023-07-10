import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/Notes/noteContext';
import Notesitem from './Notesitem';
import {useNavigate} from 'react-router-dom';

export default function Notes() {
  const [note,setNote]=useState({id:" ",etitle:"iiii ",edescription:" ",etag:""})
    let navigate=useNavigate();
    const Context=useContext(noteContext);
    const {showAlert,notes,getNotes,editNote}=Context;
  useEffect(()=>{
      if(localStorage.getItem('token')){
         getNotes();
      }else{
        navigate('/login')
      }
      //eslint-disable-next-line
    },[])
    const ref=useRef(null);
    const refClose=useRef(null);
    const updateNote=(currentNote)=>{
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
      ref.current.click();
    }
    const handleclick=()=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      showAlert("Note Updated successfully","success")
    }
    const onchange=(e)=>{
      console.log(e.target.name);
      setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
     {/* Button trigger modal  */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
{/*  Modal */}
<div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content form">
    <div className="mb-3">
     <label htmlFor="title" className="form-label">Title</label>
     <input type='text' value={note.etitle}  name='etitle'  onChange={onchange}  className="form-control" />
   </div>
   <div className="mb-3">
     <label htmlFor="description" className="form-label">Description</label>
     <input type="text" onChange={onchange} name='edescription' value={note.edescription}    className="form-control" />
   </div>
   <div className="mb-3">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input onChange={onchange} name='etag' value={note.etag}  type="text" className="form-control" />
   </div>  
      <div className="modal-footer">
        <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3 notesection">
        <h2>Your Notes</h2>
      {!(typeof notes!= "undefined" && notes!= null && notes.length!= null && notes.length>0) && <div>Empty Notes... <br />Make 
      some notes to save here
      </div>
      }
      
      {  typeof notes!= "undefined" && notes!= null && notes.length!= null && notes.length>0 && notes.map((item,index)=>{
          return <Notesitem updateNote={updateNote} key={index} note={item} />
        })
         }
    </div>
        </>
  )
}
