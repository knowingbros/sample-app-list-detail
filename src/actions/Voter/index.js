import {
    API_VOTE,
    COMMENT_VOTE_SUCCESS,
    POST_VOTE_SUCCESS,
    PXULW_VOTE_SUCCESS,
    VOTE_FAILURE,
    VOTE_REQUEST
} from "../actionTypes";

import {voteApi} from "../../api/Voter";
import {getAuthUsername} from "../../redux/auth/reducer";
import alert from "../../redux/alert/actions";

// use thunk to get token
export const makeVoteRequest = voteData => (dispatch, getState) => {
    const state = getState();

    return dispatch({
        type: API_VOTE,
        types: {
            request: VOTE_REQUEST,
            success: onVoteSuccess,
            failure: VOTE_FAILURE
        },
        callAPI: () => voteApi(voteData, getState().authReducer.access)
    });
};

export const makeShowpleaselogin = some => (dispatch, getState) => {
    const state = getState();

    const {someprops} = some;

    if (!getAuthUsername(state)) {
        dispatch(alert("You must be logged in to vote.", "danger"));
    }
};

const onVoteSuccess = (data, getState, dispatch) => {
    console.log(`XXXVT data: ${JSON.stringify(data)}`)
    if (data.hasOwnProperty("comment")) {
        return dispatch({
            type: COMMENT_VOTE_SUCCESS,
            data
        });
    } else if (data.hasOwnProperty("post")) {
        return dispatch({
            type: POST_VOTE_SUCCESS,
            data
        });
    } else if (data.hasOwnProperty("pxulw")) {
        return dispatch({
            type: POST_VOTE_SUCCESS,
            data
        });
    }

    throw new ReferenceError(
        "Upvote is of unknown type",
        "actions/Voter/index.js",
        41
    );
};
