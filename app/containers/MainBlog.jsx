import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Header } from '../components/Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts } from '../action_creators';
import { fetchPost } from '../reducer';
import { BlogPost } from '../components/BlogPost.jsx'
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
      immediateView: false,
      modalIsOpen: false
    };

    this.openImmediateView = () => {
      this.setState({immediateView: !this.state.immediateView})
    }

    this.handlePageClick = (click) => {
      const selected = click.selected+1
      const { dispatch } = this.props;
      fetchPosts(selected)(dispatch)
      this.props.router.push(`#/page/${selected}`)
    }
    this.openModal = () => {this.setState({modalIsOpen: true})}
    this.closeModal = () => {this.setState({modalIsOpen: false})}
    //this.afterOpenModal = () => this.refs.subtitle.style.color = '#f00';
  }
  componentDidMount(){
    DISQUSWIDGETS.getCount({reset:true});
    const { dispatch } = this.props;
    fetchPosts(this.props.params.pageNum)(dispatch)
  }
  componentDidUpdate() {
    DISQUSWIDGETS.getCount({reset:true});
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.posts){
      const temp = {
        editorStates: {}
      }
      nextProps.posts.forEach( post => {
        temp.editorStates[post.id]= EditorState.createWithContent(
          convertFromRaw(
            Object.assign({}, JSON.parse(post.content), {entityMap: {}})
          )
        )
      })
      const newState = Object.assign({}, this.state, temp)
      this.setState(newState)
    }
  }
  render(){
    return (
      <div style={{height: "100%"}}>
        <div className="main">
          <Header 
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalIsOpen={this.state.modalIsOpen}
          />
          <div className="posting">
            {
              this.props.isFetching
              ? null
              : (this.props.posts || []).map((postData, i) =>
                <BlogPost 
                  key={postData.id}
                  postData={postData}
                  editorState={this.state.editorStates[postData.id]}
                  immediateView={this.state.immediateView}
                  openImmediateView={this.openImmediateView}
                />
                )
            }
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
    post,
    posts,
    totalItems,
    perPage,
    context
  } = state.posts || {
    isFetching: true,
    post: {},
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
