import { FETCH_QUOTES } from '../actions/index';

import WikiquotesContentParser from '../parsers/WikiquotesContentParser';

function QuotesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_QUOTES:
      const pages = action.payload.data.query.pages[0];
      const title = pages.title;
      const quotesContent = pages.revisions[0].content;

      const quotesParser = new WikiquotesContentParser(quotesContent);
      const quoteList = quotesParser.parse();

      const date = new Date();
      const dateSet = date.toLocaleDateString();
      const existingTitles = state.map(quotesObject => quotesObject.title);

      if (!existingTitles.includes(title)) {
        return [...state, {title, quoteList, dateSet, current: 0, total: quoteList.length}];
      }
    default:
      return state;
  }
}

export default QuotesReducer;