import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    dataSent: false,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authRegSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        dataSent: true,
        loading: false     
    });
};

const authStateReset = (state, action) => {
    return updateObject(state, {   
        error: null,
        loading: false,
        dataSent: false,      
    });
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        loading: false,
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        response: {}
    });
};


const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, error: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_REG_SUCCESS: return authRegSuccess(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_STATE_RESET: return authStateReset(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;