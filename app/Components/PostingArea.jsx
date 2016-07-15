import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import RichEditor from './RichEditor.jsx';
import { connect } from 'react-redux';

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
        <RichEditor />
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
