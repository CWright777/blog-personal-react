import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'
import Contact from './Contact.jsx';
//import Animate from 'react-animate'
import Modal from 'react-modal';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = () => {this.setState({modalIsOpen: true})}
    this.closeModal = () => {this.setState({modalIsOpen: false})}
    this.afterOpenModal = () => this.refs.subtitle.style.color = '#f00';
  }
  render(){
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
              <Link to={'/'}>
                <FontAwesome
                  name='keyboard-o'
                /> Blog
              </Link>
            </li>
            <li>
              <a href="https://github.com/CWright777">
                <FontAwesome
                  name='github'
                /> GitHub
              </a>
            </li>
            <li >
              <a className="href"  onClick={this.openModal}>
                <FontAwesome
                  name='send'
                /> Contact
            </a>
            </li>
          </ul>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <Contact />
        </Modal>
      </div>
    )
  }
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


              //<FontAwesome
                //className='super-crazy-colors'
                //name='rocket'
                //size='2x'
                //spin 
              ///>
