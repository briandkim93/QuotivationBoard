import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import ModifySearchResultsReducer from './ModifySearchResultsReducer';
import DisplayLoaderReducer from './DisplayLoaderReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer,
  filteredSearchResults: ModifySearchResultsReducer,
  displayLoader: DisplayLoaderReducer,
  quotes: QuotesReducer
});

export default rootReducer;