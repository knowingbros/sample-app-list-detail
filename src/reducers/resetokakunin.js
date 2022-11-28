export const RESETOKAKUNIN_REQUEST = "RESETOKAKUNIN_REQUEST";
export const RESETOKAKUNIN_SUCCESS = "RESETOKAKUNIN_SUCCESS";
export const RESETOKAKUNIN_FAILURE = "RESETOKAKUNIN_FAILURE";
const initialState = {
  error: null,
  loading: false,
  newSubredditData: null,
};

const resetokakunin = (state=initialState, action) => {
  switch(action.type) {
    case RESETOKAKUNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        newSubredditData: null,
      };
    case RESETOKAKUNIN_SUCCESS:
      return {
        ...state,
        newSubredditData: action.data,
        loading: false,
        error: null,
      };
    case RESETOKAKUNIN_FAILURE:
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
export const getResetokakuninError = (state) => state.resetokakunin.error;
export const getResetokakuninLoading = (state) => state.resetokakunin.loading;

export default resetokakunin;
