import bluebird from 'bluebird';

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
    posts: json,
    receivedAt: Date.now()
  }
}

function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json,
    receivedAt: Date.now()
  }
}

export function fetchPosts(page) {
  return (dispatch) => {
    dispatch(requestPosts())
    fetch('http://localhost:3000/posts?page=1',{
      mode: 'cors',
    })
    .then(response => formatResponse(response))
    .then(result => dispatch(receivePosts(result)))
  }
}

function formatResponse(response) {
  return bluebird.coroutine(function* formatResponsePromise() {
    try {
      return {
        perPage: response.headers.get('Per-Page'),
        pageNum: response.headers.get('Total'),
        json: yield response.json()
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
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState())){
      return dispatch(fetchPosts())
    } 
  }
}
