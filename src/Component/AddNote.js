import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/noteContext'

export default function AddNote(props) {
  const [note,setNote]=useState({title:"",description:"",tag:"defalult"})
    const Context=useContext(noteContext);
    const {addNote}=Context;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:" ",description:"",tag:""})
        props.showAlert("Note added successfully","success")
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
    <form className='container my-3 form'>
   <div className="mb-3">
     <label htmlFor="title" className="form-label">Title</label>
     <input  name='title' value={note.title} onChange={onchange} type='text'  className="form-control" id="title" minLength="5" required />
   </div>
   <div className="mb-3">
     <label htmlFor="description" className="form-label">Description</label>
     <input name='description' value={note.description} onChange={onchange}  type="text" className="form-control" id="description" minLength="5" required/>
   </div>
   <div className="mb-3">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input name='tag' value={note.tag} onChange={onchange}  type="text" className="form-control" id="tag" minLength='5' required/>
   </div>
   <button style={{cursor:'pointer'}}
    disabled={note.title.length<5 || note.description.length<5}  onClick={handleClick}  type="submit" className="btn btn-primary my-3">Add Note</button>
 </form>
    </>
  )
}
