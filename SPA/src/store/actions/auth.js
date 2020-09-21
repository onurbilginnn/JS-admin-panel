import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authRegSuccess = () => {
    return {
        type: actionTypes.AUTH_REG_SUCCESS,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authStateReset = () => {
    return {
        type: actionTypes.AUTH_STATE_RESET,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userImageUrl');
    localStorage.removeItem('appLng');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const login = (username, password, appLanguage) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            username: username,
            password: password
        };
        let url = `http://localhost:8080/auth/login`;
        axios.post(url, loginData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userImageUrl', response.data.imageUrl);
                dispatch(authSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            })
            .catch(err => {
                let errorObject = {};
                if (err.response.data.data) {
                    for (let i = 0; i < err.response.data.data.length; ++i)
                        errorObject[err.response.data.data[i].param] = err.response.data.data[i].msg;
                    errorObject.main = '';
                } else {
                    errorObject.main = err.response.data.message;
                    errorObject.username = '';
                    errorObject.password = '';
                }
                dispatch(authFail(errorObject));
            });
    };
};

export const register = (userData) => {
    const token = localStorage.getItem('token');

    return dispatch => {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('repPass', userData.repPass);
        formData.append('role', userData.role);
        formData.append('company', userData.company);
        formData.append('file', userData.image);
        let url = `http://localhost:8080/auth/signup`;
        axios.put(url, formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
                return dispatch(authRegSuccess());
            })
            .then(dataSent => {
                dispatch(authStateReset());
            })
            .catch(err => {
                let errorObject = {};
                if(err.response) {
                    if (err.response.status === 422) {
                        for (let i = 0; i < err.response.data.data.length; ++i) {
                            errorObject[err.response.data.data[i].param] = err.response.data.data[i].msg;
                        }
                        errorObject.main = '';
                    } 
                } else {
                    errorObject.main = 'Internal Server Error!'
                }
                dispatch(authFail(errorObject));
            });
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
            }
        }
    };
};