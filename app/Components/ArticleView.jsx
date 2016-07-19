import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw
} from 'draft-js'

export default class ArticleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(Object.assign({}, JSON.parse(props.post.content), {entityMap: {}}))),
    }
  }
  componentDidMount(){
  }
  render(){
    const {editorState} = this.state;
    //var contentState = editorState.getCurrentContent();
    return(
      <div className="posting">
        <h1>{this.props.post.title}</h1>
        <h4>Clifford Wright • {this.props.post.created_at} • Subject: {this.props.post.subject}</h4>
        <div style={{textAlign: "justify"}}>
          <Editor
            readOnly={true}
            editorState={editorState}
          />
        </div>
      </div>
    )
  }
}
