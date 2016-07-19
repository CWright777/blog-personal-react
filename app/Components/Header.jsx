import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'

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
