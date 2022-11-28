import {RESETOPASU_FAILURE, RESETOPASU_REQUEST, RESETOPASU_SUCCESS,} from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  newSubredditData: null,
};

const resetopasu = (state=initialState, action) => {
  switch(action.type) {
    case RESETOPASU_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        newSubredditData: null,
      };
    case RESETOPASU_SUCCESS:
      return {
        ...state,
        newSubredditData: action.data,
        loading: false,
        error: null,
      };
    case RESETOPASU_FAILURE:
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
export const getResetopasuError = (state) => "";
export const getResetopasuLoading = (state) => "";

export default resetopasu;
