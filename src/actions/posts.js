import { APIUrls } from '../helpers/urls';
import { UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return function (dispatch) {
    const url = APIUrls.fetchPosts();

    fetch(url)
      .then((response) => {
        console.log('response from url :: ', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data api :: ', data);
        dispatch(fetchPosts(data.data.posts)); // the data here contains a object data with a list post inside it  ....  data : { data : { post : []}}
      })
      .catch((e) => {
        console.log('ERROR :: ', e);
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts: posts,
  };
}
