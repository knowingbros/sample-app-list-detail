import {TOGGLE_INITIAL_VISIT_FLAG} from "../actions/actionTypes";

const initialState = {
  initialVisitFlag: true
};

const initialVisit = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INITIAL_VISIT_FLAG:
      return { initialVisitFlag: !state.initialVisitFlag };
    default:
      return state;
  }
};

export const getInitialVisitFlag = state => state.initialVisit.initialVisitFlag;

export default initialVisit;
