import { DISPLAY_LOADER } from '../actions/index'

function DisplayLoaderReducer(state = null, action) {
  switch (action.type) {
    case DISPLAY_LOADER:
      return action.payload;
    default:
      return state;
  }
}

export default DisplayLoaderReducer;