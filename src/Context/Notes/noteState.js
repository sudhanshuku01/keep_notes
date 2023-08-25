import noteContext from "./noteContext";
import {useState } from "react";
const NoteState=(props)=>{
    const [notes,setNotes]=useState([])
    const host="http://localhost:5000"
    let showAlert=props.showAlert;
    // useEffect(()=>{
    // },[notes,setNotes])
    // console.log(notes)
//for adding a note function 
   const addNote= async (title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ 
            title:title,
            description:description,
            tag:tag
         })
    })
    const json=await response.json();
     let newnotes=notes.concat(json.note)
     setNotes(newnotes)
}
//for delete note
const deleteNote=async (id)=>{
    const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
        },
    })
    const json=await response.json();
    console.log(json);
    let newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    showAlert("Note Deleted Successfully","success")
    
}
//for update note
const editNote=async (id,title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
    })
    const json = await response.json(); 
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
}
// get all notes
const getNotes=async ()=>{
    //api call
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        mode:'cors',
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
        }
    })
   const parseddata=await response.json()
   
   setNotes(parseddata.note);
}
return(
        <noteContext.Provider value={{notes,getNotes,addNote,deleteNote,setNotes,editNote,showAlert}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState