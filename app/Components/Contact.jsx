import React, { Component, PropTypes } from 'react';
import RichEditor from './RichEditor.jsx';

export default class Contact extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div className='texture'>
        <div style={modalHeaderStyle} className="texture-normal"><h2 style={headingStyle}>Got something to say!?</h2></div><div style={modalLowerStripStyle}></div>
        <div className="contact-modal">
          <div style={headingStyle}>
            <h3>
              <label style={labelStyle}>Your Email:</label>
              <input 
                style={inputStyle}
                type="text"
              />
            </h3>
            <br/>
            <h3>
              <label>
                Message:
              </label>
            </h3>
          </div>
          <div style={{padding:"2.5em",paddingTop:".5em"}}>
            <RichEditor />
          </div>
          <div style={{textAlign: "center",paddingBottom:"2em"}}>
            <button style={{marginRight:"2.5em"}} className="danger-btn">Cancel</button>
            <button className="ocean-btn">Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const headingStyle = {
  padding: "1.5em",
  paddingBottom: ".5em"
}

const modalHeaderStyle = {
  backgroundColor: "#07575B",
  color: "white",
  borderTopRightRadius: "15px",
  borderTopLeftRadius: "15px",
  marginTop: "-1px"
}

const labelStyle = {
  marginRight: "1em",
  minWidth: "20em",
  letterSpacing: "1px",
}

const inputStyle = {
  fontSize: "1rem",
}

const spaceBetweenStyle = {
  alignItems: "flex-end",
  justifyContent: "space-between"
}

const modalLowerStripStyle = {
  backgroundColor: "#07575B",
  height: "18px",
  width: "100%"
}
