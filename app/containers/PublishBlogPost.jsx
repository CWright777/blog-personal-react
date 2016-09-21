import React, { Component, PropTypes } from 'react'
import { Header } from '../components/Header.jsx';
import RichEditor from '../components/RichEditor.jsx';
import { connect } from 'react-redux';
import { convertToRaw } from 'draft-js'
import * as postActions from '../actions/posts'
import { bindActionCreators } from 'redux'

export class PublishBlogPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = () => {this.setState({modalIsOpen: true})}
    this.closeModal = () => {this.setState({modalIsOpen: false})}
    this.createPost = () => {
      const content = JSON.stringify(convertToRaw(this.refs.richEditor.state.editorState.getCurrentContent()));
      const payload = {
        content,
        subject: this.refs.subject.value,
        title: this.refs.title.value,
      }
      this.props.actions.createPost(payload)
    }
  }
  render(){
    return(
      <div>
        Title: 
        <input
          type="textbox"
          ref='title'
        />
        Subject: 
        <input
          type="textbox"
          ref='subject'
        />
        <input
          onClick={this.createPost}
          style={styles.button}
          type="button"
          value="Add Post"
        />
        <RichEditor 
          ref="richEditor"
        />
    </div>
    )
  }
}

//PublishBlogPost.propTypes = {
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

const styles = {
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch),
    dispatch
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PublishBlogPost)
