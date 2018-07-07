import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer,
  quotes: QuotesReducer
});

export default rootReducer;