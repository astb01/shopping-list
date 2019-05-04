/**
 * Pure Function.
 *
 * No logic. This is merely a transportation layer.
 */

/** This handles the state for items. This is where the actions are handled with a type (and maybe with a payload). */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../components/actions/types";

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  /* what type of action are we handling? */
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload /* the new item that will be added */
        ] /** dont use unshift as we should NOT mutate state. */
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
