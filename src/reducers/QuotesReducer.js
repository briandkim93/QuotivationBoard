import { FETCH_QUOTES } from '../actions/index';

import WikiquotesContentParser from '../parsers/WikiquotesContentParser';

function QuotesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_QUOTES:
      const pages = action.payload.data.query.pages[0];
      const quotesTitle = pages.title;
      const quotesContent = pages.revisions[0].content;

      const quotesParser = new WikiquotesContentParser(quotesContent);
      const quotes = quotesParser.parse();
      return {title: quotesTitle, quoteList: quotes};
    default:
      return state;
  }
}

export default QuotesReducer;