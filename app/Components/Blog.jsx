import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts } from '../action_creators';
import { fetchPost } from '../reducer';
import Posting from './Posting.jsx'
import ArticleView from './ArticleView.jsx'

export class Blog extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    const { dispatch } = this.props;
    fetchPosts()(dispatch)
  }
  yo(postId){
    const { dispatch } = this.props;
    fetchPost(postId)(dispatch)
  }
  render(){
    return (
    <div>
      <Header />
      <div className="container">
        {!this.props.isArticleView ? <Posting
          onArticleView={(postId) => this.yo(postId)}
          posts={this.props.posts || []}
        /> : <ArticleView post={this.props.post}/>}
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    isArticleView,
    posts,
    post
  } = state || {
    isFetching: true,
    isArticleView: false,
    post: {},
    posts: {}
  }
  return {
    isArticleView,
    post,
    posts,
    isFetching,
    lastUpdated,
  }
}

//Blog.propTypes = {
  //posts: PropTypes.object.isRequired,
  //isFetching: PropTypes.bool.isRequired,
  //lastUpdated: PropTypes.number,
  //dispatch: PropTypes.func.isRequired
//}

export const BloggingContainer = connect(mapStateToProps)(Blog)
