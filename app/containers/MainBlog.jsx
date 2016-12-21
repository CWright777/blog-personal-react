import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as postActions from '../actions/posts'
import { BlogPage } from '../Components/BlogPost.jsx'
import FontAwesome from 'react-fontawesome';
import ReactPaginate from 'react-paginate';
import {
  EditorState,
  convertFromRaw,
} from 'draft-js'
import Immutable from 'immutable';

export class MainBlog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorStates: {},
      selectedImmediateView: null,
    };

    this.openImmediateView = (postId) => {
      const { selectedImmediateView } = this.state;
      const isAlreadyOpen = selectedImmediateView === postId
      this.setState({
        selectedImmediateView: isAlreadyOpen ? null: postId
      })
    }

    this.handlePageClick = (click) => {
      const selected = click.selected+1
      this.props.actions.fetchPosts(selected)
      this.props.router.push(`/page/${selected}`)
    }
  }
  componentDidMount(){
    DISQUSWIDGETS.getCount({reset:true});
    const { dispatch } = this.props;
    this.props.actions.fetchPosts(this.props.params.pageNum)
  }
  componentDidUpdate() {
    DISQUSWIDGETS.getCount({reset:true});
  }
  render(){
    return (
    <div 
      style={{
        height: '100%',
      }}
    >
      <div 
        style={{
          height: 'auto !important',
          height: '100%',
          minHeight: '100%',
          margin: '0 auto 46px',
        }}
      >
          <BlogPage 
            posts={this.props.posts}
            editorStates={this.state.editorStates}
            selectedImmediateView={this.state.selectedImmediateView}
            openImmediateView={postId => this.openImmediateView(postId)}
          />
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
    totalItems,
    perPage,
    context
  } = state.posts || {
    totalItems: 1,
    perPage: 5
  }
  return {
    posts,
    isFetching,
    totalItems,
    context,
    perPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch),
    dispatch
  }
};

export const BloggingContainer = connect(mapStateToProps,mapDispatchToProps)(withRouter(MainBlog))
