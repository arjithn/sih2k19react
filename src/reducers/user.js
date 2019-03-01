import {
  GOOGLE_LOGIN_SUCCESS,
  SOCIAL_LOGOUT,
  UPDATE_PHONE_DETAILS,
  SOCIAL_LOGIN_SUCCESS
} from "../constants/actionTypes";

const initialState = {
  isLoggedIn: false,
  userId: null,
  userDetails: null,
  preferredUnivs: []
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return {
        isLoggedIn: false,
        customerId: action.customerDetails.customerId,
        provider: action.provider,
        userDetails: {
          ...action.customerDetails,
          token: action.idToken
        }
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case UPDATE_PHONE_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          phone: action.phone
        }
      };
    case SOCIAL_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
