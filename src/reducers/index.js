import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import ModifySearchResultsReducer from './ModifySearchResultsReducer';
import DisplayLoaderReducer from './DisplayLoaderReducer';
import ToggleSidePanelReducer from './ToggleSidePanelReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer,
  filteredSearchResults: ModifySearchResultsReducer,
  displayLoader: DisplayLoaderReducer,
  sidePanelStatus: ToggleSidePanelReducer,
  quotes: QuotesReducer
});

export default rootReducer;