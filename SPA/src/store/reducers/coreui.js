import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    sidebarShow: 'responsive'
  }

  const toggleSideBar = (state, action) => {
    return updateObject( state, {sidebarShow: action.sidebarToggle });
};

  const showSideBar = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.COREUI_SIDEBAR_TOGGLE:       
         return toggleSideBar(state, action);
      default:
        return state
    }
  }

export default showSideBar;