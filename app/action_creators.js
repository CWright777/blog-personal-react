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
    fetch('https://personal-site-ade56.firebaseio.com/post.json')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
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
