import axios from "axios";

import {
    CREATE_SUBREDDIT_URL,
    DELETE_SUBREDDIT_URL,
    DUMMY_LUSI_URL,
    SUB_DETAIL_URL,
    SUB_SUBSCRIBE_URL
} from "../constants";
import {tokenContextObj} from "../apiUtils";

export const getSubDetailApi = subredditTitle =>
    axios.get(SUB_DETAIL_URL(subredditTitle)).then(response => response.data);

export const subredditSubscribeApi = (subredditTitle, subAction, token) => {
    const data = {action: subAction};

    return axios
        .post(SUB_SUBSCRIBE_URL(subredditTitle), data, tokenContextObj(token))
        .then(response =>
            subAction === "sub" ? response.data.sub : response.data
        );
};

export const createSubredditApi = (subredditData, token) =>
    axios
        .post(CREATE_SUBREDDIT_URL, subredditData, tokenContextObj(token))
        .then(response => response.data);

export const dummyLusiApi = (subredditData, token) =>
    axios
        .post(DUMMY_LUSI_URL, subredditData, tokenContextObj(token))
        .then(response => response.data);

export const deleteSubredditApi = (subredditPk, token) =>
    axios
        .post(DELETE_SUBREDDIT_URL(subredditPk), tokenContextObj(token))
        .then(response => response.data);
