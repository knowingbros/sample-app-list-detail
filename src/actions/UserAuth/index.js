import apiRequestErrorHandler from "../../utilities/apiErrorHandler";
import {
    API_USER_AUTH_LOGOUT,
    API_USER_AUTH_UPDATE,
    UPDATE_USER_AUTH_MODAL_ERROR,
    USER_AUTH_LOGOUT_FAILURE,
    USER_AUTH_LOGOUT_REQUEST,
    USER_AUTH_LOGOUT_SUCCESS,
    USER_AUTH_SUBSCRIBE_SUBREDDIT,
    USER_AUTH_UPDATE_FAILURE,
    USER_AUTH_UPDATE_REQUEST,
    USER_AUTH_UPDATE_SUCCESS
} from "../actionTypes";

import {getAuthUserAccess} from "../../redux/auth/reducer";
import {loadUser} from "../../redux";

export const updateErrorMessage = (errorMessage) => (
    {
        type: UPDATE_USER_AUTH_MODAL_ERROR,
        errorMessage,
    }
)


// Some helper functions. Often in these actions we just need to
// dispatch some UserAuthModal actions in addition to the UserAuth
// actions.
export const onUserAuthFailure = failureActionType => (error, getState, dispatch) => {
    const errorMessage = apiRequestErrorHandler(error);
    dispatch(updateErrorMessage(errorMessage));
    dispatch({
        type: failureActionType,
        error: errorMessage
    });
};

export const onUserAuthSuccess = successActionType => (data, getState, dispatch) => {

    console.log(`onUserAuthSuccess: data: ${data}`)
    dispatch({
        type: successActionType,
        data
    });
    dispatch(loadUser());
};


// When a subreddit is subscribed successfully we need to update the redux store
export const userAuthSubscribeSubreddit = subredditData => ({
    type: USER_AUTH_SUBSCRIBE_SUBREDDIT,
    data: subredditData
});
