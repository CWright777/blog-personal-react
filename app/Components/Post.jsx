import React, { Component, PropTypes } from 'react'
import Dotdotdot from 'react-dotdotdot';
import HtmlToReact from 'html-to-react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js'

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(Object.assign({}, props.postData.content, {entityMap: {}})))
    }
    this.formatDate =() => {
      return new Date (parseInt(this.props.postData.createdAt)).toDateString()
    }
    this.formatWords = (content) => {
      let str = "<div>"
      for(const key in content.blockMap){
        str += `<p>${content.blockMap[key].text}</p>`
        break
      }
      return str + '</div>'
    }
  }
  render(){
    const {editorState} = this.state;
    const postData = this.props.postData
    var contentState = editorState.getCurrentContent();
    return(
      <div>
        <h1>{postData.title}</h1>
        <h4>Clifford Wright • {this.formatDate()} • Subject: {postData.subject}</h4>
        <div>
        </div>
        <div className="ellipsis">
          <Editor 
            editorState={editorState}
          />
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  postData: PropTypes.object.isRequired,
}
