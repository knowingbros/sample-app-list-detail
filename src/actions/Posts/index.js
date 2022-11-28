import {
    API_CREATE_POST,
    API_DELETE_POST,
    API_POST_DETAIL,
    API_SUB_POST_LIST,
    API_SUB_POST_LIST_NEXT,
    API_UPDATE_POST, API_USER_PXULW_LIST, API_USER_PXULW_LIST_NEXT,
    CLEAR_CREATE_POST_ERROR,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    FETCH_POST_DETAIL_FAILURE,
    FETCH_POST_DETAIL_REQUEST,
    FETCH_POST_DETAIL_SUCCESS,
    FETCH_POST_LIST_FAILURE,
    FETCH_POST_LIST_NEXT_FAILURE,
    FETCH_POST_LIST_NEXT_REQUEST,
    FETCH_POST_LIST_NEXT_SUCCESS,
    FETCH_POST_LIST_REQUEST,
    FETCH_POST_LIST_SUCCESS,
    FETCH_PXULW_LIST_FAILURE, FETCH_PXULW_LIST_NEXT_FAILURE,
    FETCH_PXULW_LIST_NEXT_REQUEST, FETCH_PXULW_LIST_NEXT_SUCCESS,
    FETCH_PXULW_LIST_REQUEST,
    FETCH_PXULW_LIST_SUCCESS,
    TOGGLE_POST_EDITOR,
    UPDATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS
} from "../actionTypes";

import {
    createPostApi,
    deletePostApi,
    getPostDetailApi,
    getSubPostListApi,
    getSubPostListNextApi, getUserPxulwListApi, getUserPxulwListNextApi,
    updatePostApi
} from "../../api/Posts";
import {getAuthUserAccess} from "../../redux/auth/reducer";

export const makeUserPxulwListRequest = (username, orderBy) => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_USER_PXULW_LIST,
        types: {
            request: FETCH_PXULW_LIST_REQUEST,
            success: FETCH_PXULW_LIST_SUCCESS,
            failure: FETCH_PXULW_LIST_FAILURE
        },
        callAPI: () =>
            getUserPxulwListApi(username, orderBy, getAuthUserAccess(getState()))
    });

export const makeUserPxulwListNextRequest = url => (dispatch, getState) =>
    dispatch({
        type: API_USER_PXULW_LIST_NEXT,
        types: {
            request: FETCH_PXULW_LIST_NEXT_REQUEST,
            success: FETCH_PXULW_LIST_NEXT_SUCCESS,
            failure: FETCH_PXULW_LIST_NEXT_FAILURE
        },
        callAPI: () => getUserPxulwListNextApi(url, getAuthUserAccess(getState()))
    });


// use redux-thunk for userAuth username
export const makeSubPostListRequest = (subredditTitle, orderBy) => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_SUB_POST_LIST,
        types: {
            request: FETCH_POST_LIST_REQUEST,
            success: FETCH_POST_LIST_SUCCESS,
            failure: FETCH_POST_LIST_FAILURE
        },
        callAPI: () =>
            getSubPostListApi(subredditTitle, orderBy, getAuthUserAccess(getState()))
    });

export const makeSubPostListNextRequest = url => (dispatch, getState) =>
    dispatch({
        type: API_SUB_POST_LIST_NEXT,
        types: {
            request: FETCH_POST_LIST_NEXT_REQUEST,
            success: FETCH_POST_LIST_NEXT_SUCCESS,
            failure: FETCH_POST_LIST_NEXT_FAILURE
        },
        callAPI: () => getSubPostListNextApi(url, getAuthUserAccess(getState()))
    });

// Using redux-thunk to get an auth token
export const makeCreatePostRequest = (title, engtitletranslation, body, subredditTitle) => (
    dispatch,
    getState
) =>
    dispatch({
        type: API_CREATE_POST,
        types: {
            request: CREATE_POST_REQUEST,
            success: CREATE_POST_SUCCESS,
            failure: CREATE_POST_FAILURE
        },
        callAPI: () =>
            createPostApi(title, engtitletranslation, body, subredditTitle, getState().authReducer.access)
    });

// Using redux-thunk to get an auth token
export const makeUpdatePostRequest = (pk, body) => (dispatch, getState) =>
    dispatch({
        type: API_UPDATE_POST,
        types: {
            request: UPDATE_POST_REQUEST,
            success: UPDATE_POST_SUCCESS,
            failure: UPDATE_POST_FAILURE
        },
        callAPI: () => updatePostApi(pk, body, getState().authReducer.access)
    });

export const makeDeletePostRequest = pk => (dispatch, getState) =>
    dispatch({
        type: API_DELETE_POST,
        types: {
            request: onDeletePostRequest(pk),
            success: DELETE_POST_SUCCESS,
            failure: DELETE_POST_FAILURE
        },
        callAPI: () => deletePostApi(pk, getState().authReducer.access)
    });

// Use a thunk action creator to get the pk added to the REQUEST action
const onDeletePostRequest = pk => dispatch =>
    dispatch({
        type: DELETE_POST_REQUEST,
        pk
    });

export const makePostDetailRequest = postId => (dispatch, getState) =>
    dispatch({
        type: API_POST_DETAIL,
        types: {
            request: FETCH_POST_DETAIL_REQUEST,
            success: FETCH_POST_DETAIL_SUCCESS,
            failure: FETCH_POST_DETAIL_FAILURE
        },
        callAPI: () => getPostDetailApi(postId, getAuthUserAccess(getState()))
    });

export const togglePostEditor = () => ({
    type: TOGGLE_POST_EDITOR
});

export const togglePxulwEditor = () => ({
    type: TOGGLE_POST_EDITOR
});


export const clearCreatePostError = () => ({
    type: CLEAR_CREATE_POST_ERROR
});
