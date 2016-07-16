import React, { Component, PropTypes } from 'react'
import api from '../Util/api'

export default class Header extends Component {
  render(){
    return(
      <div>
        <div className="header">
          <h1>Clifford Wright</h1>
        </div>
        <div className="navbar">
          <ul>
            <li>Home</li>
            <li>Blog</li>
            <li>Projects</li>
            <li>Technologies</li>
          </ul>
        </div>
      </div>
    )
  }
}

