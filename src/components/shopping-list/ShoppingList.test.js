import { checkProps } from "../../test/utils";
import ShoppingList from "./ShoppingList";

describe("Shopping List", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedPropTypes = {
        getItems: () => {},
        item: {}
      };

      const result = checkProps(ShoppingList, expectedPropTypes);
      expect(result).toBeUndefined();
    });
  });
});
