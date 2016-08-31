import React, { Component, PropTypes } from 'react'
import Dotdotdot from 'react-dotdotdot';
import HtmlToReact from 'html-to-react';
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome';
import ReactHeight from 'react-height';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js'

export const BlogPostHeading = props => {
  return (
    <div>
      <h1>
        <Link to={`/blog/${props.postData.id}`}>
          {props.postData.title}
        </Link>
      </h1>
      <h4>Clifford Wright • {props.formatDate(props.postData.created_at)} • Subject: {props.postData.subject}</h4>
    </div>
  )
}

export const BlogPostFooter = props => {
  return (
    <div className="post-footer">
      <Link to={`/blog/${props.postData.id}`} className="comment-link">
        Comments <span className="disqus-comment-count" data-disqus-identifier={props.postData.title}></span>
      </Link>
      <button
        onClick={props.openImmediateView}
        className="read-more-btn"
      >
        <FontAwesome
          className={props.immediateView ? "down-arrow" : "up-arrow"}
          name='arrow-down'
        />
      </button>
    </div>
  )
}

export default class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(Object.assign({}, JSON.parse(props.postData.content), {entityMap: {}}))),
      immediateView: false,
    }
    this.formatDate = (date) => {
      return new Date (parseInt(Date.parse(date))).toDateString()
    }
    this.openImmediateView = () => {
      this.setState({immediateView: !this.state.immediateView})
    }
  }
  componentDidMount() {
    DISQUSWIDGETS.getCount({reset:true});
  }
  componentDidUpdate() {
    DISQUSWIDGETS.getCount({reset:true});
  }
  render(){
    const {editorState} = this.state;
    const postData = this.props.postData;
    var contentState = editorState.getCurrentContent();
    return(
      <div className="blog-post">
        <BlogPostHeading 
          postData={postData}
          formatDate={this.formatDate}
        />
        <ReactHeight onHeightReady={height => console.log(height)}>
          <div style={{textAlign: "justify"}} className={this.state.immediateView ? "else" : "ellipsis"}>
            <Editor 
              readOnly={true}
              editorState={editorState}
            />
          </div>
        </ReactHeight>
        <BlogPostFooter
          postData={postData}
          openImmediateView={this.openImmediateView}
          immediateView={this.immediateView}
        />
      </div>
    )
  }
}

const styles = {
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
}

BlogPost.propTypes = {
  postData: PropTypes.object.isRequired,
}
