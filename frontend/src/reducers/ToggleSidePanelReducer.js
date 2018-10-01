import { TOGGLE_SIDE_PANEL } from '../actions/index';

function ToggleSidePanelReducer(state = 'active', action) {
  switch (action.type) {
    case TOGGLE_SIDE_PANEL:
      return (state === 'active' ? 'hidden' : 'active');
    default:
      return state;
  }
}

export default ToggleSidePanelReducer;