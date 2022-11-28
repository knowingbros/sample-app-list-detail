import {UPDATE_SORT_BY_OPTION} from "../actions/actionTypes";

const initialState = { current: "best" };

const sortBy = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SORT_BY_OPTION:
      return { current: action.option };
    default:
      return state;
  }
};

export const getCurrentSortOption = state => state.sortBy.current;

export default sortBy;
