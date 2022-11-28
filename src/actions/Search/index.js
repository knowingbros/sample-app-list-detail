import {
    API_SEARCH,
    SEARCH_FAILURE,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SET_SEARCH_QUERY,
    SET_SEARCH_RESULTS_VIEW
} from "../actionTypes";

import {searchApi} from "../../api/Search";
import {getAuthUserAccess} from "../../redux/auth/reducer";

// If authenticated we can access the previous votes to make
// the arrow change colors
export const makeSearchRequest = q => (dispatch, getState) =>
  dispatch({
    type: API_SEARCH,
    types: {
      request: SEARCH_REQUEST,
      success: SEARCH_SUCCESS,
      failure: SEARCH_FAILURE
    },
    callAPI: () => searchApi(q, getAuthUserAccess(getState()))
  });

export const setSearchQuery = q => ({
  type: SET_SEARCH_QUERY,
  query: q
});

export const setSearchResultsView = (viewName = "posts") => ({
  type: SET_SEARCH_RESULTS_VIEW,
  viewName
});
