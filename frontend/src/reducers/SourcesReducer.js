import ACTION_TYPES from '../actions/types';

function SourcesReducer(state=[], action) {
  let sources = state.slice();
  switch (action.type) {
    case ACTION_TYPES.GET_SOURCES:
      if (action.payload.status === 200) {
        sources = action.payload.data.sort((a, b) => a.id < b.id ? -1 : 1);
      }
      return sources;
    case ACTION_TYPES.ADD_SOURCE:
      if (action.payload.status === 201) {
        if (!sources.map(source => source.quoteset).includes(action.payload.data.quoteset)) {
          sources.push(action.payload.data);
        }
      } 
      return sources;
    case ACTION_TYPES.REMOVE_SOURCE:
      sources = state.filter(source => source.id !== action.meta.sourceId);
      return sources;
    case ACTION_TYPES.CHANGE_QUOTE:
      if (action.payload.status === 200) {
        sources = sources.map(source => {
          if (source.id === action.payload.data.id) {
            source.current_quote_index += 1;
            source.quote = action.payload.data.quote;
          }
          return source;
        });
      }
      return sources;
    case ACTION_TYPES.REFRESH_QUOTES:
      if (action.payload.length > 0) {
        const succesfulRequests = action.payload.filter(response => response.status === 200);
        if (action.payload.length === succesfulRequests.length) {
          sources = action.payload.map(response => response.data);
        }
      }
      return sources;
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

export default SourcesReducer;