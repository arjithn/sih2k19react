import { combineReducers } from "redux";
import { INSTITUTIONS } from "../constants/actionTypes";

const byId = (state = {}, action) => {
  switch (action.type) {
    case INSTITUTIONS.SUCCESS:
      return {
        ...state,
        ...action.response.entities.institutions
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case INSTITUTIONS.SUCCESS:
      return action.response.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case INSTITUTIONS.REQUEST:
      return true;
    case INSTITUTIONS.SUCCESS:
    case INSTITUTIONS.FAILURE:
      return false;
    default:
      return state;
  }
};

const institutions = combineReducers({ byId, allIds, isFetching });

export default institutions;
