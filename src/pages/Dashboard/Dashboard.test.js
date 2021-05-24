import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import { findByTestAttribute } from "../../test";

import Dashboard from "./index";
import { MOCK_METRIC } from "../../test/consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (initialState = {}, props) => {
  return shallow(<Dashboard {...props} />);
};
jest.mock("react-chartjs-2", () => ({
  Line: () => null,
}));

describe("unit and snapshot tests for dashboard page", () => {
  let wrapper;
  beforeAll(() => {
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
    Object.defineProperty(window, "crypto", {
      value: { getRandomValues: mGetRandomValues },
    });
    jest
      .useFakeTimers("modern")
      .setSystemTime(new Date("2021-05-23").getTime());
  });
  beforeEach(() => {
    wrapper = setup({ metricsReducer: { metrics: [MOCK_METRIC] } });
  });
  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render non-empty component", () => {
    const inputComponent = findByTestAttribute(wrapper, "dashboard-wrapper");
    expect(inputComponent.length).toBe(1);
  });

  it("should render dashboard container", () => {
    const inputComponent = findByTestAttribute(wrapper, "dashboard-container");
    expect(inputComponent.children()).toHaveLength(1);
  });

  it("should render charts component", () => {
    const inputComponent = findByTestAttribute(wrapper, "charts-component");
    expect(inputComponent).toBeDefined();
  });
});
