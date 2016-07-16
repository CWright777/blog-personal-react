import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import RichEditor from './RichEditor.jsx';
import { connect } from 'react-redux';
import { createPost } from '../reducer'

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
        <RichEditor submitPost={(post) => createPost(post)(this.props.dispatch)}/>
    </div>
    )
  }
}

//PostingArea.propTypes = {
  //posts: PropTypes.object.isRequired,
//}

function mapStateToProps(state) {
  const {
    isFetching
  } = state || {
    isFetching: true
  }
  return {
    isFetching
  }
}
export const PostingAreaContainer = connect(mapStateToProps)(PostingArea)
