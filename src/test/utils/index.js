import checkPropTypes from "check-prop-types";

/** Finds a element that has a data-test attribute value. */
export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErrors = checkPropTypes(
    // eslint-disable-next-line react/forbid-foreign-prop-types
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );

  return propsErrors;
};
