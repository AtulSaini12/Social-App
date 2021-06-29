import { APIUrls } from '../helpers/urls';
import { FETCH_SEARCH_USER_SUCCESS } from './actionTypes';
import { getAuthFromLocalStorage } from '../helpers/utils';

export function searchUsers(searchText) {
  const url = APIUrls.searchUsers(searchText);
  return (dispatch) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data.success) {
          dispatch(fetchSearchUserSuccess(data.data.users));
        } else {
          dispatch(fetchSearchUserSuccess([]));
        }
      });
  };
}

export function fetchSearchUserSuccess(users) {
  return {
    type: FETCH_SEARCH_USER_SUCCESS,
    users,
  };
}
