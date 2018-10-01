import { FETCH_QUOTES } from '../actions/index';
import { REFRESH_QUOTE } from '../actions/index';
import { REMOVE_SOURCE } from '../actions/index';

import WikiquotesContentParser from '../parsers/WikiquotesContentParser';

function QuotesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_QUOTES:
      const pages = action.payload.data.query.pages[0];
      const title = pages.title;
      const quotesContent = pages.revisions[0].content;

      const quotesParser = new WikiquotesContentParser(quotesContent);
      let quoteList = quotesParser.parse();

      const date = new Date();
      const dateSet = date.toLocaleDateString();
      const existingTitles = state.map(quotesObject => quotesObject.title);

      if (!existingTitles.includes(title)) {
        const randomIndex = Math.floor(Math.random() * quoteList.length);
        return [...state, {title, quoteList, dateSet, current: randomIndex, total: quoteList.length}];
      }
      break;
    case REFRESH_QUOTE:
      const refreshedState = state.map(quoteObject => {
        if (quoteObject.title === action.payload.title) {
          return action.payload;
        } else {
          return quoteObject;
        }
      });
      return refreshedState;
      break;
    case REMOVE_SOURCE:
      return state.filter(quoteObject => !(quoteObject.title === action.payload));
    default:
      return state;
  }
}

export default QuotesReducer;