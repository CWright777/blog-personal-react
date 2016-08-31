import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import Header from '../components/Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts } from '../action_creators';
import { fetchPost } from '../reducer';
import BlogPosting from '../components/BlogPosting.jsx'
import ArticleView from '../containers/ArticleView.jsx'
import FontAwesome from 'react-fontawesome';
import ReactPaginate from 'react-paginate';

export class MainBlog extends Component {
  constructor(props) {
    super(props)
    this.handlePageClick = (click) => {
      const selected = click.selected+1
      const { dispatch } = this.props;
      fetchPosts(selected)(dispatch)
      this.props.router.push(`#/page/${selected}`)
    }
  }
  componentDidMount(){
    const { dispatch } = this.props;
    fetchPosts(this.props.params.pageNum)(dispatch)
  }
  render(){
    return (
    <div style={{height: "100%"}}>
      <div className="main">
        <Header />
        <div className="posting">
          <BlogPosting
            posts={this.props.posts || []}
          />
        </div>
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

//MainBlog.propTypes = {
  //posts: PropTypes.object.isRequired,
  //isFetching: PropTypes.bool.isRequired,
  //lastUpdated: PropTypes.number,
  //dispatch: PropTypes.func.isRequired
//}

export const BloggingContainer = connect(mapStateToProps)(withRouter(MainBlog))
