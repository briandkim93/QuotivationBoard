import { combineReducers } from 'redux';

import SearchResultsReducer from './SearchResultsReducer';
import ModifySearchResultsReducer from './ModifySearchResultsReducer';
import ToggleSidePanelReducer from './ToggleSidePanelReducer';
import QuotesReducer from './QuotesReducer';

const rootReducer = combineReducers({
  searchResults: SearchResultsReducer,
  filteredSearchResults: ModifySearchResultsReducer,
  sidePanelStatus: ToggleSidePanelReducer,
  quotes: QuotesReducer
});

export default rootReducer;