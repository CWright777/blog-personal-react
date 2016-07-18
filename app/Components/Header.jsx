import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

export default class Header extends Component {
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
              <FontAwesome
                name='keyboard-o'
              /> Blog
            </li>
            <li>
              <FontAwesome
                name='github'
              /> GitHub
            </li>
            <li>
              <FontAwesome
                name='send'
              /> Contact
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

              //<FontAwesome
                //className='super-crazy-colors'
                //name='rocket'
                //size='2x'
                //spin 
              ///>
