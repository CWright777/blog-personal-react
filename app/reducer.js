import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function getPosts(){
  fetch('https://personal-site-ade56.firebaseio.com/post.json').then((posts) => {
      return posts
    })
}

function posts(state = {
  isFetching: false,
  posts: {}
}, action) {
  switch (action.type) {
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
    default:
      return state
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, 
        posts(state,action)
      )
    default: 
      return state;
  }
}
