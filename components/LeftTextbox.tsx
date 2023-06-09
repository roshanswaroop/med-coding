// import Highlighter from "react-highlight-words";
import React from 'react'

export default function LeftTextbox(props: { note: string}) {
  
  return (
    <div className="left-textbox">
      <div className="left-title">Patient Note</div>
      <div className="left-text">
        {props.note}
      </div>
    </div>
  );
}