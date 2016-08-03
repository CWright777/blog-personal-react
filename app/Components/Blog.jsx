import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts } from '../action_creators';
import { fetchPost } from '../reducer';
import Posting from './Posting.jsx'
import ArticleView from './ArticleView.jsx'
import ReactPaginate from 'react-paginate';

export class Blog extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const { dispatch } = this.props;
    fetchPosts()(dispatch)
  }
  render(){
    return (
    <div>
      <Header />
      <div className="container">
        <Posting
          posts={this.props.posts || []}
        />
      </div>
      <ReactPaginate 
        previousLabel={"previous"}
        nextLabel={"next"}
        pageNum={Math.ceil(this.props.pageNum/this.props.perPage)}
      />
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    posts,
    post,
    pageNum,
    perPage
  } = state || {
    isFetching: true,
    post: {},
    posts: [],
    pageNum: 1,
    perPage: 5
  }
  return {
    post,
    posts,
    isFetching,
    pageNum,
    perPage
  }
}

//Blog.propTypes = {
  //posts: PropTypes.object.isRequired,
  //isFetching: PropTypes.bool.isRequired,
  //lastUpdated: PropTypes.number,
  //dispatch: PropTypes.func.isRequired
//}

export const BloggingContainer = connect(mapStateToProps)(Blog)
