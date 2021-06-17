import { UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return function (dispatch) {
    const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(fetchPosts(data.data.posts)); // the data here contains a object data with a list post inside it  ....  data : { data : { post : []}}
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}
