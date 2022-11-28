import {
    FETCH_SUB_DETAIL_FAILURE,
    FETCH_SUB_DETAIL_REQUEST,
    FETCH_SUB_DETAIL_SUCCESS,
    SET_SUB_TO_HOME,
    SUBREDDIT_SUBSCRIBE_FAILURE,
    SUBREDDIT_SUBSCRIBE_REQUEST,
    SUBREDDIT_SUBSCRIBE_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  title: null,
  pseudo: false,
  description: null,
  subscriptionLoading: false
};

// psuedosubreddits are those like 'home' or 'popular'
// They aren't true subreddits that can be posted to
// but they do share enough similarities to be listed with
// the others.
// This is exported so that a title grabbed from the router can be
// before the state is updated if necessary. (see Subreddit component)
export const checkForPseudoSubreddits = title => {
  const pseudos = ["popular", "home", "all"];
  return pseudos.indexOf(title.toLowerCase()) >= 0;
};

const subreddit = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUB_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SUB_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        title: action.data.title,
        pseudo: checkForPseudoSubreddits(action.data.title),
        description: action.data.description
      };
    case FETCH_SUB_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SET_SUB_TO_HOME:
      return {
        ...state,
        loading: false,
        error: null,
        title: action.title
      };
    case SUBREDDIT_SUBSCRIBE_REQUEST:
      return {
        ...state,
        subscriptionLoading: true
      };
    case SUBREDDIT_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscriptionLoading: false
      };
    case SUBREDDIT_SUBSCRIBE_FAILURE:
      return {
        ...state,
        subscriptionLoading: false
      };
    default:
      return state;
  }
};

// selectors
export const getSubredditTitle = state => state.subreddit.title;
export const getSubredditData = state => ({
  title: state.subreddit.title,
  description: state.subreddit.description,
  pseudo: state.subreddit.pseudo,
  loading: state.subreddit.loading,
  error: state.subreddit.error
});

export default subreddit;
