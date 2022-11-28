import axios from "axios";

import {CREATE_POST_URL, POST_DETAIL_URL, SUB_POST_LIST_URL, USER_PXULW_LIST_URL} from "../constants";
import {tokenContextObj} from "../apiUtils";

export const getUserPxulwListApi = (username, orderBy, token) => {
    const params = {orderby: orderBy};
    return axios
        .get(USER_PXULW_LIST_URL(username), {
            params,
            ...tokenContextObj(token)
        })
        .then(response => response.data);
};

// For fetching the next pxulws once the bottom of the current pxulw
// list is reached. The orderby parameter is already included in url
export const getUserPxulwListNextApi = (url, token) => {
    return axios.get(url, tokenContextObj(token)).then(response => response.data);
};


// Get the list of posts for a particular subreddit
export const getSubPostListApi = (subredditTitle, orderBy, token) => {
    const params = {orderby: orderBy};
    return axios
        .get(SUB_POST_LIST_URL(subredditTitle), {
            params,
            ...tokenContextObj(token)
        })
        .then(response => response.data);
};

// For fetching the next posts once the bottom of the current post
// list is reached. The orderby parameter is already included in url
export const getSubPostListNextApi = (url, token) => {
    return axios.get(url, tokenContextObj(token)).then(response => response.data);
};

export const createPostApi = (title, engtitletranslation, body, subredditTitle, token) => {
    const data = {title, engtitletranslation, body};
    return axios
        .post(CREATE_POST_URL(subredditTitle), data, tokenContextObj(token))
        .then(response => response.data);
};

export const updatePostApi = (pk, body, token) => {
    const data = {body};
    return axios
        .patch(POST_DETAIL_URL(pk), data, tokenContextObj(token))
        .then(response => response.data);
};

export const getPostDetailApi = (postId, token) =>
    axios
        .get(POST_DETAIL_URL(postId), tokenContextObj(token))
        .then(response => response.data);

export const deletePostApi = (pk, token) => {
    return axios
        .delete(POST_DETAIL_URL(pk), tokenContextObj(token))
        .then(response => response.data);
};
