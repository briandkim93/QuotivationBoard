import ACTION_TYPES from '../actions/types';

function FollowingListReducer(state=[], action) {
  switch (action.type) {
    case ACTION_TYPES.GET_FOLLOWING_LIST:
      const followingList = action.payload.map(response => response.data);
      return followingList;
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

export default FollowingListReducer;