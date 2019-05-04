/** Action Creators for Shopping Items. */

import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => dispatch => {
  /* sends a request to the itemReducer to decide what action to perform, here GET_ITEMS, which will return the items. */
  dispatch(setItemsLoading());

  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

/** We need the id to delete an item so that is used and passed to the reducer action. */
export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: res.data
    })
  );
};

export const addItem = newItem => dispatch => {
  console.log("Adding ...", JSON.stringify(newItem));

  axios.post("/api/items", newItem).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

/** to state items are loading */
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
