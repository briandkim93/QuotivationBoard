import { FILTER_SEARCH_RESULTS } from '../actions/index';
import { CLEAR_SEARCH_RESULTS } from '../actions/index';

import WikiquotesContentParser from '../parsers/WikiquotesContentParser';

function ModifySearchResultsReducer(state = [], action) {
  switch (action.type) {
    case FILTER_SEARCH_RESULTS:
      const filteredSearchResults = action.payload.filter(
        result => {
          const quotesContent = result.data.query.pages[0].revisions[0].content;
          const quotesParser = new WikiquotesContentParser(quotesContent);
          let quoteList = quotesParser.parse();
          quoteList = quoteList.filter(quote => quote.length <= 500);
          return (quoteList.length > 0);
        }
      );
      const filteredTitles = filteredSearchResults.map(result => result.data.query.pages[0].title);
      if (filteredTitles.length > 0) { 
        return filteredTitles.slice(0, 5);
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