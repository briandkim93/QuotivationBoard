import { FETCH_QUOTES } from '../actions/index';

function QuotesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_QUOTES:
      const pages = action.payload.data.query.pages[0];
      const quotesTitle = pages.title;
      const quotesContent = pages.revisions[0].content;
      return {quotesTitle, quotesContent};
    default:
      return state;
  }
}

export default QuotesReducer;