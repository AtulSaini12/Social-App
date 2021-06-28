import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';
import { UPDATE_POSTS, ADD_POST } from './actionTypes';

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

//Add Post Action Creators

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
        },
        body: getFormBody({ content }),
      }
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log('POST CREATE DATA', data);

          if (data.success) {
            dispatch(data.data.post);
          }
        })
    );
  };
}
