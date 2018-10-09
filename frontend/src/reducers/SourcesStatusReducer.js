import ACTION_TYPES from '../actions/types';

function SourcesStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_SOURCES:
      return action.payload.status;
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

export default SourcesStatusReducer;