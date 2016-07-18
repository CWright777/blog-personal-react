const api = {
  getPosts(){
    const url = 'https://personal-site-ade56.firebaseio.com/post.json';
    return fetch(url).then((res) => res.json());
  },
  addPost(post){
    const url = 'http://localhost:3000/posts';
    return fetch(url, {
      mode: 'no-cors',
      method: 'post',
      body: JSON.stringify(post),
      dataType: 'json',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json())
  },
};

module.exports = api;
