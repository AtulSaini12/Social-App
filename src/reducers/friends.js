import { FETCH_FRIEND_SUCCESS } from '../actions/actionTypes';

const defaultFriendsState = [];

export default function friends(state = [], action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESS:
      return [...action.friends];
    default:
      return state;
  }
}
