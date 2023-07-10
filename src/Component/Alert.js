import React from 'react'
export default function Alert(props){
  const capitalize=(word)=>{
      let lower=word.toLowerCase();
      return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return(
      <div style={{height:'40px',position:'sticky',top:"0",zIndex:'1'}}>
        {props.alert && <div className={`alert d-flex align-items-center role="alert`}>
        <strong>{capitalize(props.alert.type)} : &nbsp;</strong>{props.alert.msg}
      </div>}
      </div>
    )
}
