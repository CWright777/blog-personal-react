import {List, Map} from 'immutable';
import { requestCreatePost, responseCreatePost } from './action_creators'
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
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
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
