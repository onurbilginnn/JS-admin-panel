import * as actionTypes from './actionTypes';

export const toggleSideBar = (val) => {    
    return {
        type: actionTypes.COREUI_SIDEBAR_TOGGLE,
        sidebarToggle: val   
    };
};