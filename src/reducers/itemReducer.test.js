import { GET_ITEMS } from "../components/actions/types";
import itemReducer from "./itemReducer";

describe("Items Reducer", () => {
  it("Should return a default state", () => {
    const newState = itemReducer(undefined, {});
    expect(newState).toEqual({ items: [], loading: false });
  });

  it("Should return a new state when when GET_ITEMS", () => {
    const items = {
      items: [{ name: "Milk" }, { name: "Sugar" }],
      loading: false
    };
    const newState = itemReducer(undefined, {
      type: GET_ITEMS,
      payload: items.items
    });

    expect(newState).toEqual(items);
  });
});
