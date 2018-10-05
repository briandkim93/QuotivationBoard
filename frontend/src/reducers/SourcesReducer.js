import ACTION_TYPES from '../actions/types';

function SourcesReducer(state=[], action) {
  let succesfulRequests = [];
  let sources = [];
  switch (action.type) {
    case ACTION_TYPES.GET_SOURCES:
      if (action.payload.status === 200) {
        return action.payload.data;
      } else {
        return state;
      }
    case ACTION_TYPES.ADD_SOURCE:
      const updatedState = state.slice();
      if (action.payload.status === 201) {
        if (!state.map(source => source.quoteset).includes(action.payload.data.quoteset)) {
          updatedState.push(action.payload.data);
        }
      } 
      return updatedState;
    case ACTION_TYPES.REMOVE_SOURCE:
      return state.filter(source => source.id !== action.meta.sourceId);
    case ACTION_TYPES.CHANGE_QUOTE:
      sources = state.slice();
      return sources.map(source => {
        if (source.id === action.meta.sourceId) {
          source.current_quote_index += 1;
        }
        return source;
      });
    case ACTION_TYPES.REFRESH_QUOTES:
      sources = state;
      if (action.payload.length > 0) {
        succesfulRequests = action.payload.filter(response => response.status === 200);
        if (action.payload.length === succesfulRequests.length) {
          sources = action.payload.filter(response => response.config.url.includes('api/account_to_quoteset'));
          sources = sources.map(source => source.data);
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