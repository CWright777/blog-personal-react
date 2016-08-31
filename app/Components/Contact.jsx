import React, { Component, PropTypes } from 'react';
import RichEditor from './RichEditor.jsx';

export const ContactForm = props => {
  return (
    <div>
      <div style={styles.headingStyle}>
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
    </div>
  )
}

export const ButtonFooter = props => {
  return (
    <div style={{textAlign: "center",paddingBottom:"2em"}}>
      <button style={{marginRight:"2.5em"}} className="danger-btn">
        Cancel
      </button>
      <button className="ocean-btn">Send</button>
    </div>
  )
}

export const Contact = props => {
  return(
    <div className='texture'>
      <div style={styles.modalHeaderStyle} className="texture-normal"><h2 style={styles.headingStyle}>Got something to say!?</h2></div><div style={styles.modalLowerStripStyle}></div>
      <div className="contact-modal">
        <ContactForm />
        <ButtonFooter />
      </div>
    </div>
  )
}

const styles = {
  headingStyle: {
    padding: "1.5em",
    paddingBottom: ".5em"
  },
  modalHeaderStyle: {
    backgroundColor: "#07575B",
    color: "white",
    borderTopRightRadius: "15px",
    borderTopLeftRadius: "15px",
    marginTop: "-1px"
  },
  labelStyle: {
    marginRight: "1em",
    minWidth: "20em",
    letterSpacing: "1px",
  },
  inputStyle: {
    fontSize: "1rem",
  },
  modalLowerStripStyle: {
    backgroundColor: "#07575B",
    height: "18px",
    width: "100%"
  }
}
