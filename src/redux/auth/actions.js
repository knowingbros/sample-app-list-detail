import {
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS
} from './types'
import axios from 'axios'
import alert from '../alert/actions'
import {hideLoader, showLoader} from '../loader/actions'
import {
    API_USER_AUTH_RESEND_ACTIVATION_EMAIL,
    USER_AUTH_RESEND_ACTIVATION_EMAIL_REQUEST
} from "../../actions/actionTypes";
import {onUserAuthFailure, onUserAuthSuccess} from "../../actions/UserAuth";
import {RESEND_ACTIVATION_EMAIL_URL_FAIL, RESEND_ACTIVATION_EMAIL_URL_SUCCESS} from "../../actions/types";
import {API_ROOT_URL, RESEND_ACTIVATION_EMAIL_URL} from "../../api/constants";
import * as Sentry from "@sentry/react";

export const refreshTokenSuccess = (access) => {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        data: {
            access
        }
    }
}


export const authenticatedSuccess = () => {
    return {
        type: AUTHENTICATED_SUCCESS,

    }
}

export const authenticatedFail = () => {
    return {
        type: AUTHENTICATED_FAIL,

    }
}

export const loginSuccess = (access, refresh) => {

    return {
        type: LOGIN_SUCCESS,
        data: {
            access,
            refresh
        }
    }
}

export const loginFailed = (error) => {

    return {
        type: LOGIN_FAILED,
        data: {error}
    }
}

export const userLoadedSuccess = (user) => {
    return {
        type: USER_LOADED_SUCCESS,
        data: {user}
    }
}

export const userLoadedFailed = (error) => {
    return {
        type: USER_LOADED_FAIL,
        data: {error}
    }
}
export const logOut = () => {

    return {
        type: LOGOUT,
    }
}


export const logout = () => {
    return dispatch => {
        dispatch(showLoader())
        dispatch(logOut())
        dispatch(alert('You have been logged out.', 'success'))
        dispatch(hideLoader())

    }
}

export const refreshToken = () => {
    return dispatch => {
        const refresh = localStorage.getItem('refresh')
        if (refresh != null) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const body = {refresh: refresh}
            console.log(`body stringify in actions.js: ${JSON.stringify(body)}`)

            axios.post(`${API_ROOT_URL}auth/jwt/refresh/`, body, config)
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(refreshTokenSuccess(response.data.access))
                        dispatch(checkAuthenticated())

                    } else {
                        dispatch(authenticatedFail())
                    }
                }).catch(() => {
                dispatch(authenticatedFail())
            })
        }
    }
}

export const checkAuthenticated = () => {
    return dispatch => {
        const access = localStorage.getItem('access')
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };


            const body = {token: access}
            console.log(`body in actions.js console log: ${body}`);
            console.log(`body with stringify in actions.js: ${JSON.stringify(body)}`);
            Sentry.captureMessage(`body in actions.js: ${body}`);
            Sentry.captureMessage(`body with stringify in actions.js: ${JSON.stringify(body)}`);

            axios.post(`${API_ROOT_URL}auth/jwt/verify/`, body, config)
                .then((response) => {
                    Sentry.captureMessage(`response.data in actions.js: ${JSON.stringify(response.data)}`);

                    const code = response.data.code
                    console.log(`code in actions.js console log: ${code}`);
                    if (code !== 'token_not_valid') {
                        dispatch(authenticatedSuccess())

                    } else {
                        dispatch(refreshToken())
                    }
                }).catch(() => {
                dispatch(refreshToken())
            })

        } else {
            dispatch(refreshToken())
        }
    }
}


export const loadUser = () => {
    return (dispatch) => {
        if (localStorage.getItem('access')) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            axios.get(`${API_ROOT_URL}auth/users/me/`, config)
                .then(response => {
                    dispatch(userLoadedSuccess(response.data))
                }).catch(error => {
                dispatch(userLoadedFailed('Failed to load user'))

            })
        } else {
            dispatch(userLoadedFailed('Login failed'))

        }
    }
}


export const login = (username, password, remember) => {
    return (dispatch) => {
        dispatch(showLoader())
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const body = JSON.stringify({username, password})
        axios.post(`${API_ROOT_URL}auth/jwt/create/`, body, config)
            .then((response) => {
                const access = response.data.access
                const refresh = response.data.refresh
                dispatch(loginSuccess(access, refresh))
                dispatch(loadUser())
                dispatch(alert('Successfully logged in', 'success'))
                dispatch(hideLoader())

            }).catch((error) => {

            dispatch(loginFailed(`Login failed - ${error}`))
            dispatch(alert(` ${error}`, 'danger'))
            dispatch(hideLoader())

        })

    }
}

export const makeResendActivationEmail = email => ({

    type: API_USER_AUTH_RESEND_ACTIVATION_EMAIL,
    types: {
        request: USER_AUTH_RESEND_ACTIVATION_EMAIL_REQUEST,
        success: onUserAuthSuccess(RESEND_ACTIVATION_EMAIL_URL_SUCCESS),
        failure: onUserAuthFailure(RESEND_ACTIVATION_EMAIL_URL_FAIL)
    },
    callAPI: () => {
        return userResendActivationEmail(email);
    }
});

export const userResendActivationEmail = email => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return axios.post(RESEND_ACTIVATION_EMAIL_URL, {email}, config).then(response => response.data);
};
