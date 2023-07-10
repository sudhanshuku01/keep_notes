import React,{useContext} from 'react'
import noteContext from '../Context/Notes/noteContext'
export default function Notesitem(props) {
  const Context=useContext(noteContext);
  const {deleteNote}=Context;
  const {note,updateNote}=props
  return (
 <div className="col-md-3 my-2">
  <div className="card" >
  <div className="card-body">
    <div className="card-title m-0">{note.title}</div>
    <i style={{cursor:'pointer'}} onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash-can mx-2"></i>
    <i onClick={()=>updateNote(note)} style={{cursor:'pointer'}} className="fa-solid fa-pen-to-square mx-2"></i>
  </div>
    <p className="card-text m-2 p-2">{note.description}</p>
</div>
</div>
  )
}
