import {
  ADD_FRIEND,
  FETCH_FRIEND_SUCCESS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const defaultFriendsState = [];

export default function friends(state = [], action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESS:
      return [...action.friends];

    case ADD_FRIEND:
      return state.concat(action.friend);

    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;

    default:
      return state;
  }
}
