import React, { Component, PropTypes } from 'react'
import Post from './Post'


export default class Posting extends Component {
  render(){
    const posts = this.props.posts;
    let postsArr = []
    for( const post in posts) {
      postsArr.push({
        id: post,
        title: posts[post].title,
        subject: posts[post].subject,
        content: posts[post].content,
        createdAt: posts[post].createdAt
      })
    }
    return(

      <div className="posting">
        {postsArr.map((postData, i) =>
          <Post key={i} postData={postData} />
        )}
      </div>
    )
  }
}

Posting.propTypes = {
  posts: PropTypes.object.isRequired,
}
