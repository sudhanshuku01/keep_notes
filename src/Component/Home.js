import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
export default function Home(props) {
  return (
  <>
  <div className='container'>
    <AddNote showAlert={props.showAlert} />
  </div>
  <div className='container'>
   <Notes/>
   </div>
  </>
  )
}
