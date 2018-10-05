import ACTION_TYPES from '../actions/types';

function QuotesReducer(state=[], action) {
  let succesfulRequests = [];
  let quotes = [];
  let sources = [];
  let quotesets = [];
  switch (action.type) {
    case ACTION_TYPES.GET_QUOTES:
      quotes = state.slice();
      if (action.payload.length > 0) {
        succesfulRequests = action.payload.filter(response => response.status === 200);
        if (action.payload.length === succesfulRequests.length) {
          quotesets = action.payload.map(response => response.data);
          quotes = quotesets.map(quoteset => {
            const quotesetIndex = action.meta.sources.filter(source => quoteset.id === source.quoteset)[0].current_quote_index
            const sourceId = action.meta.sources.filter(source => quoteset.id === source.quoteset)[0].id
            return {
              sourceId: sourceId,
              quotesetId: quoteset.id,
              author: quoteset.author,
              quote: quoteset.quotes[quotesetIndex],
            };
          });
        }
      }
      return quotes;
    case ACTION_TYPES.CHANGE_QUOTE:
      quotes = state.slice();
      const source = action.payload[0].data;
      const quoteset = action.payload[1].data;
      return quotes.map(quoteInfo => {
        if (quoteInfo.sourceId === action.meta.sourceId) {
          quoteInfo.quote = quoteset.quotes[source.current_quote_index];
        }
        return quoteInfo;
      });
    case ACTION_TYPES.REMOVE_SOURCE:
      return state.filter(quote => quote.sourceId !== action.meta.sourceId);
    case ACTION_TYPES.REFRESH_QUOTES:
      quotes = state.slice();
      if (action.payload.length > 0) {
        succesfulRequests = action.payload.filter(response => response.status === 200);
        if (action.payload.length === succesfulRequests.length) {
          sources = action.payload.filter(response => response.config.url.includes('api/account_to_quoteset'));
          sources = sources.map(source => source.data);
          quotesets = action.payload.filter(response => response.config.url.includes('api/quoteset'));
          quotesets = quotesets.map(quoteset => quoteset.data);
          quotes = quotes.map(quoteInfo => {
            const refreshedQuoteIndex = sources.filter(source => quoteInfo.sourceId === source.id)[0].current_quote_index;
            const authorQuotes = quotesets.filter(quoteset => quoteInfo.quotesetId === quoteset.id)[0].quotes;
            quoteInfo.current_quote_index = refreshedQuoteIndex;
            quoteInfo.quote = authorQuotes[refreshedQuoteIndex];
            return quoteInfo
          });
        }
      }
      return quotes;
    case ACTION_TYPES.LOGOUT:
      return [];
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      if (action.payload.status === 200) {
        return [];
      } else {
        return state;
      }
    case ACTION_TYPES.CLEAR_STATE:
      return [];
    default:
      return state;
  }
}

export default QuotesReducer;