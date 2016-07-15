import React, { Component, PropTypes } from 'react'
import Dotdotdot from 'react-dotdotdot';
import HtmlToReact from 'html-to-react';

export default class Post extends Component {
  formatDate(){
    return new Date (parseInt(this.props.postData.createdAt)).toDateString()
  }
  markdown(input){
    const htmlToReactParser = new HtmlToReact.Parser(React);
    return htmlToReactParser.parse(input)
  }
  render(){
    const postData = this.props.postData
    return(
      <div>
        <h1>{postData.title}</h1>
        <h4>Clifford Wright • {this.formatDate()} • Subject: {postData.subject}</h4>
        <Dotdotdot clamp={3}>{this.markdown(postData.content)}</Dotdotdot>
      </div>
    )
  }
}

Post.propTypes = {
  postData: PropTypes.object.isRequired,
}
