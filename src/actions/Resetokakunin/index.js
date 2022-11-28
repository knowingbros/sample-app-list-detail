import {RESETOKAKUNIN_FAIL, RESETOKAKUNIN_SUCCESS} from "../types";
import axios from "axios";
import {API_ROOT_URL} from "../../api/constants";

export const makeResetokakuninRequest = (uid, token, new_password, re_new_password) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(uid, token, new_password, re_new_password);

    try {
        const res = await axios
            .post(`${API_ROOT_URL}auth/users/reset_password_confirm/`, body, config)

        dispatch({
            type: RESETOKAKUNIN_SUCCESS
        });


    } catch (err) {
        dispatch({
            type: RESETOKAKUNIN_FAIL,
        });
    }
};