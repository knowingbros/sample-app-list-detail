import {
    SEARCH_FAILURE,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SET_SEARCH_QUERY,
    SET_SEARCH_RESULTS_VIEW
} from "../actions/actionTypes";
import {allIds, objectById} from "../utilities/reducerUtils";

const initialState = {
  query: "",
  allSubreddits: [],
  subredditsById: {},
  allUsers: [],
  usersById: {},
  searchResultsView: "posts",
  error: null,
  loading: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allUsers: allIds(action.data.users),
        usersById: objectById(action.data.users),
        allSubreddits: allIds(action.data.subreddits),
        subredditsById: objectById(action.data.subreddits)
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.query,
        searchResultsView: "posts"
      };
    case SET_SEARCH_RESULTS_VIEW:
      return {
        ...state,
        searchResultsView: action.viewName
      };
    default:
      return state;
  }
};

export const getSearchUserResults = state => state.search.userResults;
export const getSearchSubredditResults = state => state.search.subredditResults;
export const getSearchError = state => state.search.error;
export const getSearchLoading = state => state.search.loading;
export const getSearchQuery = state => state.search.query;
export const getSearchAllSubreddits = state => state.search.allSubreddits;
export const getSearchAllUsers = state => state.search.allUsers;
export const getSearchSubredditById = (state, id) =>
  state.search.subredditsById[id];
export const getSearchUserById = (state, id) => state.search.UsersById[id];
export const getSearchResultsView = state => state.search.searchResultsView;

export default search;
