import ACTION_TYPES from '../actions/types';

function SearchResultsReducer(state=[], action) {
  switch (action.type) {
    case ACTION_TYPES.GET_SEARCH_RESULTS:
      let searchResults = [];
      if (action.meta.query.trim().length > 0) {
        const firstLetter = action.meta.query[0];
        const terms = action.meta.query.split(' ');
        searchResults = action.payload.data.slice();
        for (let i = 0; i < terms.length; i += 1) {
          if (terms[i]) {
            searchResults = searchResults.filter(author => author.name.toLowerCase().includes(terms[i].toLowerCase()));
          }
        }
        if (firstLetter) {
          searchResults = searchResults.sort((a, b) => a.name[0].toLowerCase() !== firstLetter.toLowerCase() ? 1 : -1);
        }
        searchResults = searchResults.slice(0, 5);
        if (searchResults.length === 0) {
          searchResults.push({id: null});
        }
      }
      return searchResults;
    case ACTION_TYPES.CLEAR_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
}

export default SearchResultsReducer;