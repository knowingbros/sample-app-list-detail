import {CREATE_SUBREDDIT_FAILURE, CREATE_SUBREDDIT_REQUEST, CREATE_SUBREDDIT_SUCCESS,} from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  newSubredditData: null,
};

const createSubreddit = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_SUBREDDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        newSubredditData: null,
      };
    case CREATE_SUBREDDIT_SUCCESS:
      return {
        ...state,
        newSubredditData: action.data,
        loading: false,
        error: null,
      };
    case CREATE_SUBREDDIT_FAILURE:
      return {
        ...state,
        newSubredditData: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// selectors
export const getCreateSubredditError = (state) => state.createSubreddit.error;
export const getCreateSubredditLoading = (state) => state.createSubreddit.loading;

export default createSubreddit;
