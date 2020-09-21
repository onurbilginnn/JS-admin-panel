import * as actionTypes from './actionTypes';

export const setAppLngRdx = (lang) => {
    return {
        type: actionTypes.SET_APP_LNGRDX,
        language: lang 
    };
};


export const setAppLngLocalStore = (lng) => {
    return dispatch => {       
            dispatch(setAppLngRdx(lng));  
            localStorage.setItem('appLng', lng.toUpperCase());
    };
};