import {List, Map} from 'immutable';
import { requestCreatePost, responseCreatePost, requestPost, receivePost } from './action_creators'
import api from './Util/api'

function setState(state, newState) {
  return state.merge(newState);
}

function posts(state = {
  isFetching: false,
  posts: {}
}, action) {
  switch (action.type) {
    case 'REQUEST_CREATE_POST':
    case 'REQUEST_POST':
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts.json,
        pageNum: Number(action.posts.pageNum),
        perPage: Number(action.posts.perPage),
        lastUpdated: action.receivedAt
      })
    case 'RECEIVE_POST':
      return Object.assign({}, state, {
        isFetching: false,
        post: action.posts,
      })
    case 'RECEIVE_CREATE_POST':
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'REQUEST_CREATE_POST':
    case 'RESPONSE_CREATE_POST':
    case 'REQUEST_POSTS':
    case 'REQUEST_POST':
    case 'RECEIVE_POST':
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, 
        posts(state,action)
      )
    default: 
      return state;
  }
}

export function createPost(post){
  return (dispatch) => {
    dispatch(requestCreatePost())
    api.addPost(post)
      .then(json => dispatch(responseCreatePost(json)))
  }
}

export function fetchPost(postId) {
  return (dispatch) => {
    dispatch(requestPost())
    fetch(`http://localhost:3000/posts/${postId}`,{
      mode: 'cors',
    })
      .then(response => response.json())
      .then(json => dispatch(receivePost(json)))
  }
}
