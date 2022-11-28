import {
    API_CREATE_SUBREDDIT,
    API_DUMMY_LUSI,
    API_SUB_DETAIL,
    API_SUBREDDIT_SUBSCRIBE,
    CREATE_SUBREDDIT_FAILURE,
    CREATE_SUBREDDIT_REQUEST,
    CREATE_SUBREDDIT_SUCCESS,
    DUMMY_LUSI_FAILURE,
    DUMMY_LUSI_REQUEST,
    DUMMY_LUSI_SUCCESS,
    FETCH_SUB_DETAIL_FAILURE,
    FETCH_SUB_DETAIL_REQUEST,
    FETCH_SUB_DETAIL_SUCCESS,
    SUBREDDIT_SUBSCRIBE_FAILURE,
    SUBREDDIT_SUBSCRIBE_REQUEST,
    SUBREDDIT_SUBSCRIBE_SUCCESS,
    USER_AUTH_SUBSCRIBE_SUBREDDIT,
    USER_AUTH_UNSUBSCRIBE_SUBREDDIT
} from "../actionTypes";

import {createSubredditApi, dummyLusiApi, getSubDetailApi, subredditSubscribeApi} from "../../api/Subreddit";

export const makeSubDetailRequest = subredditTitle => ({
    type: API_SUB_DETAIL,
    types: {
        request: FETCH_SUB_DETAIL_REQUEST,
        success: FETCH_SUB_DETAIL_SUCCESS,
        failure: FETCH_SUB_DETAIL_FAILURE
    },
    callAPI: () => getSubDetailApi(subredditTitle)
});

export const makeCreateSubredditRequest = subredditData => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_CREATE_SUBREDDIT,
        types: {
            request: CREATE_SUBREDDIT_REQUEST,
            success: CREATE_SUBREDDIT_SUCCESS,
            failure: CREATE_SUBREDDIT_FAILURE
        },
        callAPI: () => createSubredditApi(subredditData, getState().authReducer.access)
    });

export const makeDummyLusiRequest = subredditData => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_DUMMY_LUSI,
        types: {
            request: DUMMY_LUSI_REQUEST,
            success: DUMMY_LUSI_SUCCESS,
            failure: DUMMY_LUSI_FAILURE
        },
        callAPI: () => dummyLusiApi(subredditData, getState().authReducer.access)
    });

// Get token from redux-thunk
export const makeSubSubscriptionRequest = (subredditTitle, subAction) => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_SUBREDDIT_SUBSCRIBE,
        types: {
            request: SUBREDDIT_SUBSCRIBE_REQUEST,
            success: onSuccessfulSubscription(subredditTitle, subAction),
            failure: SUBREDDIT_SUBSCRIBE_FAILURE
        },
        callAPI: () =>
            subredditSubscribeApi(
                subredditTitle,
                subAction,
                getState().authReducer.access
            )
    });

// When the request is successful we need to not only
// indicate it success in the subreddit state tree
// but also retrieve the modified user data from the backend
const onSuccessfulSubscription = (subredditTitle, subAction) => (
    data,
    getState,
    dispatch
) => {
    dispatch({
        type: SUBREDDIT_SUBSCRIBE_SUCCESS,
        data
    });
    if (subAction.toLowerCase() === "sub") {
        return dispatch({
            type: USER_AUTH_SUBSCRIBE_SUBREDDIT,
            data
        });
    }
    return dispatch({
        type: USER_AUTH_UNSUBSCRIBE_SUBREDDIT,
        data: {subredditTitle}
    });
};
