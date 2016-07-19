import React, { Component, PropTypes } from 'react'
import Post from './Post'


export default class Posting extends Component {
  constructor(props) {
    super(props)
    this.posts = this.props.posts || []
  }
  render(){
    return(
      <div className="posting">
        {this.props.posts.map((postData, i) =>
          <Post 
            key={i}
            postData={postData}
            onArticleView={this.props.onArticleView}
          />
        )}
      </div>
    )
  }
}

//Posting.propTypes = {
  //posts: PropTypes.array.isRequired,
//}
