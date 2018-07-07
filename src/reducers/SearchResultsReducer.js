import { FETCH_SEARCH_RESULTS } from '../actions/index';

function SearchResultsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return action.payload.data[1];
    default:
      return state;
  }
}

export default SearchResultsReducer;