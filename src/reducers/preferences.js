import { UPDATE_PREF_ATTRIBUTE } from "../constants/actionTypes";

const initialState = {
  institutionType: "UNIVERSITY",
  indianState: null, // state id mapped to state name
  universityType: null,
  universityName: null
  // girlExclusive : 0,
  // scholarship : 0,
};
const pref = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PREF_ATTRIBUTE:
      return {
        ...state,
        [action.key]: action.normalizedWeight
      };
    default:
      return state;
  }
};

export default pref;
