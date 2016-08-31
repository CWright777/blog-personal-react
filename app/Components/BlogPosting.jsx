import React, { Component, PropTypes } from 'react';
import BlogPost from './BlogPost';

export default class BlogPosting extends Component {
  constructor(props) {
    super(props)
    this.posts = this.props.posts || [];
  }
  render(){
    return(
      <div>
        {this.props.posts.map((postData, i) =>
          <BlogPost 
            key={i}
            postData={postData}
          />
        )}
      </div>
    )
  }
}

//BlogPosting.propTypes = {
  //posts: PropTypes.array.isRequired,
//}
