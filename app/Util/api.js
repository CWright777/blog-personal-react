const api = {
  getPosts(){
    const url = 'https://personal-site-ade56.firebaseio.com/post.json';
    return fetch(url).then((res) => res.json());
  },
  addPost(post){
    const url = 'https://personal-site-ade56.firebaseio.com/post.json';
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(post)
    }).then((res) => res.json())
  },
  getNotes(username){
    console.log(username)
    const url = `https://github-saver-e41a4.firebaseio.com/${username}.json`
    return fetch(url).then((res) => res.json());
  },
  addNote(username, note){
    const url = `https://github-saver-e41a4.firebaseio.com/${username}.json`
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;
