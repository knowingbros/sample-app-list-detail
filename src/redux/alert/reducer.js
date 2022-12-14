import {REMOVE_ALERT, SET_ALERT} from './types'

const initialState = []

const alertReducer = (state = initialState, action) => {
    const {type, data} = action

    switch (type) {
        case SET_ALERT:
            return [
                ...state,
                data
            ]

        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== data.id)


        default:
            return state
    }

}

export default alertReducer