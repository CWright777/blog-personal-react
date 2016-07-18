export function requestPosts() {
  return {
    type: 'REQUEST_POSTS',
  };
}

function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json,
    receivedAt: Date.now()
  }
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(requestPosts())
    fetch('http://localhost:3000/posts',{
      mode: 'cors',
    })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

export function requestCreatePost(postInfo) {
  console.log('sadds')
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
