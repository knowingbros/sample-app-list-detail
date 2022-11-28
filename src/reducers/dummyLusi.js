import {DUMMY_LUSI_FAILURE, DUMMY_LUSI_REQUEST, DUMMY_LUSI_SUCCESS,} from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  newSubredditData: null,
};

const dummyLusi = (state=initialState, action) => {
  switch(action.type) {
    case DUMMY_LUSI_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        newSubredditData: null,
      };
    case DUMMY_LUSI_SUCCESS:
      return {
        ...state,
        newSubredditData: action.data,
        loading: false,
        error: null,
      };
    case DUMMY_LUSI_FAILURE:
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
export const getDummyLusiError = (state) => state.dummyLusi.error;
export const getDummyLusiLoading = (state) => state.dummyLusi.loading;

export default dummyLusi;
