import { FETCH_SEARCH_USER_SUCCESS } from '../actions/actionTypes';

const initialSearchState = {
  results: [],
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_USER_SUCCESS:
      return {
        ...state,
        results: action.results,
      };
    default:
      return state;
  }
}
