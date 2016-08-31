import React, { Component, PropTypes } from 'react'
import Header from '../components/Header.jsx';
import RichEditor from '../components/RichEditor.jsx';
import { connect } from 'react-redux';
import { createPost } from '../reducer'
import { convertToRaw } from 'draft-js'

export class PublishBlogPost extends Component {
  constructor(props) {
    super(props)
    this.createPost = () => {
      const content = JSON.stringify(convertToRaw(this.refs.richEditor.state.editorState.getCurrentContent()));
      const payload = {
        content,
        subject: this.refs.subject.value,
        title: this.refs.title.value,
      }
      createPost(payload)(props.dispatch)
    }
  }
  render(){
    return(
      <div>
        <Header />
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

export default connect(mapStateToProps)(PublishBlogPost)
