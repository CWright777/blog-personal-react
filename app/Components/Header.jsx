import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'
import { Contact } from './Contact.jsx';
//import Animate from 'react-animate'
import Modal from 'react-modal';

export const Header = props => {
  return(
    <div>
      <div className="header">
        <h1>
          <span>
            <FontAwesome
              name='terminal'
              style={{marginRight: "10px"}}
            />Cliff's Blog
          </span>
        </h1>
      </div>
      <div className="navbar">
        <ul>
          <li>
            <a href={'/'}>
              <FontAwesome
                name='keyboard-o'
              /> Blog
            </a>
          </li>
          <li>
            <a href="https://github.com/CWright777">
              <FontAwesome
                name='github'
              /> GitHub
            </a>
          </li>
          <li >
            <a className="href"  onClick={props.openModal}>
              <FontAwesome
                name='send'
              /> Contact
          </a>
          </li>
        </ul>
      </div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <Contact />
      </Modal>
    </div>
  )
}

const customStyles = {
  content : {
    borderRadius: "15px",
    padding: 0,
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
