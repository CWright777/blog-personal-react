import React, { Component, PropTypes } from 'react';
import { Header } from '../components/Header.jsx';
import { connect } from 'react-redux';
import * as postActions from '../actions/posts'
import { bindActionCreators } from 'redux'
import { fetchPost } from '../action_creators';
import DisqusThread from 'react-disqus-thread';
import {
  Editor,
  EditorState,
  convertFromRaw
} from 'draft-js';
//import './Util/scroll.js';

export class ArticleView extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const { dispatch } = this.props;
    //console.log(this.props.posts.map((x)=> x.id).indexOf(Number(this.props.params.postId)))
    fetchPost(this.props.params.postId)(dispatch)
  }
  render(){
    const editorState = this.props.post
      ? EditorState.createWithContent(
        convertFromRaw(Object.assign({}, JSON.parse(this.props.post.content), {entityMap: {}}))
      )
      : {}
    return(
      <div>
        {
          this.props.post && this.props.post.id == this.props.params.postId 
          ? <div className="posting">
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
            </div>
            : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    posts,
    post
  } = state.posts || {
    isFetching: true,
  }
  return {
    post,
    posts,
    isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch),
    dispatch
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ArticleView)
