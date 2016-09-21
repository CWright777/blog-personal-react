const fetch = require('isomorphic-fetch')
const api = {
  getPosts(){
    const url = 'https://personal-site-ade56.firebaseio.com/post.json';
    return fetch(url).then((res) => res.json());
  },
  addPost(post){
    const url = 'https://blog.cliffordwright.com/api/posts';
    return fetch(url, {
      mode: 'cors',
      method: 'post',
      body: JSON.stringify(post),
      dataType: 'json',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    }).then((res) => res.json())
  },
};

module.exports = api;
