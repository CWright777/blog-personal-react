import React, { Component, PropTypes } from 'react'
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { fetchPosts} from '../action_creators';
import Posting from './Posting.jsx'

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
  render(){
    return (
    <div>
      <Header />
      <div className="container">
        <Posting posts={this.props.posts || {}} />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    lastUpdated,
    posts
  } = state || {
    isFetching: true,
    posts: {}
  }
  return {
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
