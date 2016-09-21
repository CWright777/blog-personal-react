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
  const formatDate = (date) => {
    return new Date (parseInt(Date.parse(date))).toDateString()
  }
  return (
    <div>
      <h1>
        <Link to={`/blog/${props.postData.id}`}>
          {props.postData.title}
        </Link>
      </h1>
      <h4>Clifford Wright • {formatDate(props.postData.created_at)} • Subject: {props.postData.subject}</h4>
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
        onClick={() => props.openImmediateView(props.postData.id)}
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

export const BlogPost = props => {
  return(
    <div className="blog-post">
      <BlogPostHeading 
        postData={props.postData}
      />
      <div style={{textAlign: "justify"}} className={props.selectedImmediateView === props.postData.id ? "else" : "ellipsis"}>
        <Editor 
          readOnly={true}
          editorState={props.editorState}
        />
      </div>
      <BlogPostFooter
        postData={props.postData}
        openImmediateView={postId => props.openImmediateView(postId)}
        selectedImmediateView={props.selectedImmediateView}
      />
    </div>
  )
}

export const BlogPage = props => {
  return (
    <div className="posting">
      {
        props.posts
        ? (props.posts).map((postData, i) => {
          return (
            <BlogPost 
              key={postData.id}
              postData={postData}
              editorState={postData.content}
              selectedImmediateView={props.selectedImmediateView}
              openImmediateView={postId => props.openImmediateView(postId)}
            />
          )
        })
        : null
      }
  </div>
  )
}

const styles = {
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
}
