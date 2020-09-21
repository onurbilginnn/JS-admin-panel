import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  language: 'TR'
};

const setAppLangRdx = (state, action) => {
    return updateObject( state, { language: action.language } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_APP_LNGRDX: return setAppLangRdx(state, action);    
        default:
            return state;
    }
};

export default reducer;