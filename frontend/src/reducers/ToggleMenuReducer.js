import ACTION_TYPES from '../actions/types';

function ToggleMenuReducer(state=true, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
}

export default ToggleMenuReducer;