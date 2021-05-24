import React from "react";
import Chart from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttribute } from "../../../test";
import { MOCK_METRIC } from "../../../test/consts";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  title: "Testing is fun!",
  keyField: "ttfb",
  metrics: [MOCK_METRIC, MOCK_METRIC, MOCK_METRIC],
};

const setup = (props) => {
  return mount(<Chart {...props} />);
};
jest.mock("react-chartjs-2", () => ({
  Line: () => <div>chart</div>,
}));
describe("snapshot and unit tests for chart", () => {
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
    wrapper = setup(defaultProps);
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render title correctly", () => {
    const inputComponent = findByTestAttribute(wrapper, "chart-title");
    expect(inputComponent.text()).toMatch(/Testing is fun!/);
  });

  it("should render chart correctly", () => {
    wrapper.setProps({ ...defaultProps });
    let inputComponent = findByTestAttribute(wrapper, "chart-ttfb-wrapper");
    expect(inputComponent.children()).toHaveLength(1);
    inputComponent = findByTestAttribute(wrapper, "chart-ttfb");
    expect(inputComponent.exists()).toBeTruthy();
    inputComponent = findByTestAttribute(wrapper, "chart-empty");
    expect(inputComponent.exists()).not.toBeTruthy();
  });

  it("should not render chart", () => {
    wrapper.setProps({ ...defaultProps, metrics: [] });
    let inputComponent = findByTestAttribute(wrapper, "chart-ttfb-wrapper");
    expect(inputComponent.children()).toHaveLength(1);
    inputComponent = findByTestAttribute(wrapper, "chart-ttfb");
    expect(inputComponent.exists()).not.toBeTruthy();
    inputComponent = findByTestAttribute(wrapper, "chart-empty");
    expect(inputComponent.exists()).toBeTruthy();
  });
});
