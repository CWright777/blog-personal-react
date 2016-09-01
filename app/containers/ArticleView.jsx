import React, { Component, PropTypes } from 'react';
import { Header } from '../components/Header.jsx';
import { connect } from 'react-redux';
import { fetchPost } from '../reducer';
import DisqusThread from 'react-disqus-thread';
import {
  Editor,
  EditorState,
  convertFromRaw
} from 'draft-js';
//import './Util/scroll.js';
import jQuery from 'jquery';

export default class ArticleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = () => {this.setState({modalIsOpen: true})}
    this.closeModal = () => {this.setState({modalIsOpen: false})}
  }
  componentDidMount(){
    const { dispatch } = this.props;
    fetchPost(this.props.params.postId)(dispatch)
  }
  render(){
    const editorState = this.props.post ? EditorState.createWithContent(convertFromRaw(Object.assign({}, JSON.parse(this.props.post.content), {entityMap: {}}))) : {}
    return(
      <div>
        <Header 
          openModal={this.openModal}
          closeModal={this.closeModal}
          modalIsOpen={this.state.modalIsOpen}
        />
        {this.props.post && this.props.post.id == this.props.params.postId ? <div className="posting">
          <h1>{this.props.post.title}</h1>
          <h4>Clifford Wright • {this.props.post.created_at} • Subject: {this.props.post.subject}</h4>
          <div style={{textAlign: "justify"}}>
            <Editor
              readOnly={true}
              editorState={editorState}
            />
          </div>
          <DisqusThread
            shortname="cliffblog"
            identifier={this.props.post.title}
            className="yolo"
          />
        </div> : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { post } = state || {
    post: {}
  }
  return {post}
}

export const ArticleContainer = connect(mapStateToProps)(ArticleView)
