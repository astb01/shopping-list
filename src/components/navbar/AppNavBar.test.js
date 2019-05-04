import React from "react";
import { shallow } from "enzyme";
import AppNavBar from "./AppNavBar";
import { findByTestAttr } from "../../test/utils";

const setUp = (props = {}) => {
  const component = shallow(<AppNavBar {...props} />);
  return component;
};

describe("AppNavBar", () => {
  let componentUnderTest;

  beforeEach(() => {
    componentUnderTest = setUp();
  });

  it("Should have a navbar brand", () => {
    const wrapper = findByTestAttr(componentUnderTest, "navbar-brand");
    expect(wrapper.length).toBe(1);
  });

  it("Should have a navlink-main NavLink", () => {
    const wrapper = findByTestAttr(componentUnderTest, "navlink-main");
    expect(wrapper.length).toBe(1);
  });
});
