import bluebird from 'bluebird';
import api from '../services/api';
import {
  EditorState,
  convertFromRaw,
} from 'draft-js'

export function requestPosts() {
  return {
    type: 'REQUEST_POSTS',
  };
}

export function requestPost() {
  return {
    type: 'REQUEST_POST',
  };
}

export function receivePost(json) {
  return {
    type: 'RECEIVE_POST',
    post: json,
    receivedAt: Date.now()
  }
}

function receivePosts(json) {
  const { perPage, totalItems, posts } = json 
  return {
    type: 'RECEIVE_POSTS',
    totalItems,
    perPage,
    posts,
    receivedAt: Date.now()
  }
}

export function fetchPosts(page=1) {
  return (dispatch) => {
    dispatch(requestPosts())
    fetch(`https://blog.cliffordwright.com/api/posts?page=${page}`,{
      mode: 'cors',
    })
    .then(response => formatResponse(response))
    .then(posts => dispatch(receivePosts(posts)))
  }
}

function formatResponse(response) {
  return bluebird.coroutine(function* formatResponsePromise() {
    try {
      const rawPosts = yield response.json();
      const posts = rawPosts.map((post, i)=>{
        const { id, subject, title } = post;
        const createdAt = post.created_at
        const rawContent = JSON.parse(post.content);
        const editorState = convertFromRaw(Object.assign({}, rawContent, {entityMap: {}}));
        const content = EditorState.createWithContent(editorState);
        return {
          id,
          content,
          subject,
          title,
          createdAt
        }
      })

      return {
        perPage: Number(response.headers.get('Per-Page')),
        totalItems: Number(response.headers.get('Total')),
        posts
      }
    } catch (err) {
      throw err;
    }
  })();
  
}

export function requestCreatePost(postInfo) {
  return {
    type: 'REQUEST_CREATE_POST',
    postInfo
  }
}

export function responseCreatePost(postInfo) {
  return {
    type: 'RESPONSE_CREATE_POST',
    postInfo
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    console.log('There was an else...')
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState())){
      return dispatch(fetchPosts())
    } 
  }
}

export function fetchPost(postId) {
  return (dispatch) => {
    dispatch(requestPost())
    fetch(`https://blog.cliffordwright.com/api/posts/${postId}`,{
      mode: 'cors',
    })
      .then(response => response.json())
      .then(json => dispatch(receivePost(json)))
  }
}

export function createPost(post){
  return (dispatch) => {
    dispatch(requestCreatePost())
    api.addPost(post)
      .then(json => dispatch(responseCreatePost(json)))
  }
}
