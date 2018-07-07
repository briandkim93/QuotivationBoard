import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer
});

export default rootReducer;