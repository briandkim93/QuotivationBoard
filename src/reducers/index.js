import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import ModifySearchResultsReducer from './ModifySearchResultsReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer,
  filteredSearchResults: ModifySearchResultsReducer,
  quotes: QuotesReducer
});

export default rootReducer;