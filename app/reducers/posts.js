import {List, Map} from 'immutable';
import { requestCreatePost, responseCreatePost, requestPost, receivePost } from '../action_creators'
import api from '../services/api'

function posts(state = {}, action) {
  switch (action.type) {
    case 'REQUEST_CREATE_POST':
    case 'REQUEST_POST':
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'RECEIVE_POSTS':
      const { totalItems, perPage, createdAt, posts } = action;
      return Object.assign({}, state, {
        isFetching: false,
        posts,
        totalItems,
        perPage,
        createdAt,
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

