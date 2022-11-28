import {RESETOPASU_FAILURE, RESETOPASU_REQUEST, RESETOPASU_SUCCESS,} from "../actionTypes";

import {PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS} from "../types";
import axios from "axios";
import {API_ROOT_URL} from "../../api/constants";

export const makeResetopasuRequest = email => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios
            .post(`${API_ROOT_URL}auth/users/reset_password/`, email, config)

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: res.data,
            types: {
                request: RESETOPASU_REQUEST,
                success: RESETOPASU_SUCCESS,
                failure: RESETOPASU_FAILURE
            },
        });

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
    }


};