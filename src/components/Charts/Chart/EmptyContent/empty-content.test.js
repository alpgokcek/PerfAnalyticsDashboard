import React from "react";
import EmptyContent from "./index";

import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props) => {
  return shallow(<EmptyContent {...props} />);
};

describe("snapshot test for EmptyContent", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
