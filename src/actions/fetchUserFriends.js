import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { APIUrls } from '../helpers/urls';
import { FETCH_FRIEND_SUCCESS } from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-ww-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('data', data);
        if (data.data.success) {
          dispatch(fetchFriendSuccess(data.data.friends));
          return;
        }
        fetchFriendFailed(data.message);
      });
  };
}

export function fetchFriendSuccess(friends) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friends,
  };
}
