import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import { connect } from 'react-redux';
import {
  convertFromRaw,
  convertToRaw,
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  Entity,
} from 'draft-js'

export class PostingArea extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
  }
  render(){
    return(
      <div>
        <Header />
    </div>
    )
  }
}

//Posting.propTypes = {
  //posts: PropTypes.object.isRequired,
//}
//function mapStateToProps(state) {
  //return {}
//}
//export const PostingAreaContainer = connect(mapStateToProps)(PostingArea)
