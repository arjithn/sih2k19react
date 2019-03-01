import { combineReducers } from "redux";
import user from "./user";
import preferences from "./preferences";
import institutions from "./institutions";

const reducer = combineReducers({
  user,
  preferences,
  institutions
});

export default reducer;
