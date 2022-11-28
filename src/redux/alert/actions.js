import {REMOVE_ALERT, SET_ALERT} from './types'
import {v4} from 'uuid'

export const setAlert = (message, alertType, id) => {
    return {
        type: SET_ALERT,
        data: {message, alertType, id}
    }
}


export const removeAlert = (id) => {
    return {
        type: REMOVE_ALERT,
        data: {id}
    }
}


const alert = (message, alertType, timeout = 5000) => {
    return dispatch => {
        const id = v4()
        dispatch(setAlert(message, alertType, id))
        setTimeout(() => {
            dispatch(removeAlert(id))
        }, timeout);
    }
}

export default alert

