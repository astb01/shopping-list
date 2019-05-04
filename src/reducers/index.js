/* Brings all reducers from application into a single point. */
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  item: itemReducer /** refer to this reducer as 'item' */
});
