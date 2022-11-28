import axios from "axios";

import {USER_PROFILE_URL} from "../constants";
import {tokenContextObj} from "../apiUtils";

export const getUserProfileApi = (username, token) => {
    return axios
        .get(USER_PROFILE_URL(username), tokenContextObj(token))
        .then(response => response.data);
};
