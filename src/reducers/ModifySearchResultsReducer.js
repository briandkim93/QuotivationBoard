import { FILTER_SEARCH_RESULTS } from '../actions/index';
import { CLEAR_SEARCH_RESULTS } from '../actions/index';

function ModifySearchResultsReducer(state = [], action) {
  switch (action.type) {
    case FILTER_SEARCH_RESULTS:
      const filteredSearchResults = action.payload.filter(
        result => {
          const quotesContent = result.data.query.pages[0].revisions[0].content;
          return (quotesContent.includes("== Quotes ==") || quotesContent.includes("==Quotes=="))
        }
      );
      const filteredTitles = filteredSearchResults.map(result => result.data.query.pages[0].title);
      if (filteredTitles.length > 0) { 
        return filteredTitles;
      } else {
        return ['No Results Found'];
      }
      break;
    case CLEAR_SEARCH_RESULTS:
      return [];
  }
  return state;
}

export default ModifySearchResultsReducer;