import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts } from '../action_creators';
import { fetchPost } from '../reducer';
import Posting from './Posting.jsx'
import ArticleView from './ArticleView.jsx'
import FontAwesome from 'react-fontawesome';
import ReactPaginate from 'react-paginate';

export class Blog extends Component {
  constructor(props) {
    super(props)
    this.handlePageClick = (click) => {
      const selected = click.selected+1
      const { dispatch } = this.props;
      fetchPosts(selected)(dispatch)
      this.props.router.push(`#/blog/${selected}`)
    }
  }
  componentDidMount(){
    const { dispatch } = this.props;
    fetchPosts(this.props.params.pageNum)(dispatch)
  }
  render(){
    return (
    <div>
      <div className="main">
        <Header />
        <div className="posting">
          <Posting
            posts={this.props.posts || []}
          />
        </div>
        <div id="bs"></div>
      </div>
      <div className="footer">
        <ReactPaginate 
          previousLabel={<FontAwesome name='angle-left' size="2x"/>}
          nextLabel={<FontAwesome name='angle-right' size="2x"/>}
          pageNum={Math.ceil(this.props.totalItems/this.props.perPage)}
          containerClassName={"pagination"}
          clickCallback={this.handlePageClick}
          activeClassName={"active"}
          initialSelected={Number(this.props.params.pageNum || 1) - 1}
        />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    posts,
    post,
    totalItems,
    perPage,
    context
  } = state || {
    isFetching: true,
    post: {},
    posts: [],
    totalItems: 1,
    perPage: 5
  }
  return {
    post,
    posts,
    isFetching,
    totalItems,
    context,
    perPage
  }
}

//Blog.propTypes = {
  //posts: PropTypes.object.isRequired,
  //isFetching: PropTypes.bool.isRequired,
  //lastUpdated: PropTypes.number,
  //dispatch: PropTypes.func.isRequired
//}

export const BloggingContainer = connect(mapStateToProps)(withRouter(Blog))
