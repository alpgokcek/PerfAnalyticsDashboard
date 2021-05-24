import React from "react";
import Charts from "./index";
import * as redux from "react-redux";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttribute, mockStore } from "../../test";
import { MOCK_METRIC } from "../../test/consts";
import { Provider } from "react-redux";
import moment from "moment";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  getMetrics: jest.fn,
  metrics: [MOCK_METRIC, MOCK_METRIC, MOCK_METRIC],
};

const setup = (store, props) => {
  return mount(
    <Provider store={store}>
      <Charts {...props} />
    </Provider>
  );
};

jest.mock("react-chartjs-2", () => ({
  Line: () => <div>chart</div>,
}));

describe("snapshot and unit tests for charts", () => {
  let wrapper, useDispatchSpy;
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
    const store = mockStore({});
    wrapper = setup(store, defaultProps);
    useDispatchSpy = jest.spyOn(store, "dispatch");
    useDispatchSpy.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    useDispatchSpy.mockClear();
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render TimeRangeSelector", () => {
    const inputComponent = findByTestAttribute(wrapper, "charts-datetime");
    expect(inputComponent.exists()).toBeTruthy();
  });

  it("should reset datetime range", () => {
    const date = new Date("2021-05-25").getTime();
    const expectedDateString = moment(date).format("DD-MMM-YY HH:mm");
    jest.useFakeTimers("modern").setSystemTime(date);
    findByTestAttribute(wrapper, "charts-range-reset")
      .first()
      .simulate("click");
    const startDate = findByTestAttribute(wrapper, "datetime-start");
    expect(startDate.find("input").instance().value).toMatch(
      expectedDateString
    );
    const endDate = findByTestAttribute(wrapper, "datetime-end");
    expect(endDate.find("input").instance().value).toMatch(expectedDateString);
  });

  it("should render charts correctly", () => {
    wrapper.setProps({ ...defaultProps });
    let inputComponent = findByTestAttribute(wrapper, "charts-container");
    expect(inputComponent.children()).toHaveLength(4);
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
