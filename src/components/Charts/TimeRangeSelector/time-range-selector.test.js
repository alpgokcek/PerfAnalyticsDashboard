import React from "react";
import TimeRangeSelector from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttribute } from "../../../test";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  onChange: jest.fn,
  filters: { start: new Date("2021-05-23"), end: new Date("2021-05-23") },
};

const setup = (props) => {
  return mount(<TimeRangeSelector {...props} />);
};

describe("snapshot and unit tests for TimeRangeSelector", () => {
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

  it("should show the current date/time", () => {
    const startDate = findByTestAttribute(wrapper, "datetime-start");
    expect(startDate.find("input").instance().value).toMatch("23-May-21 03:00");
    const endDate = findByTestAttribute(wrapper, "datetime-end");
    expect(endDate.find("input").instance().value).toMatch("23-May-21 03:00");
  });

  it("should update the date/time after filter change", () => {
    wrapper.setProps({
      ...defaultProps,
      filters: {
        start: new Date("2021-05-21"),
        end: new Date("2021-05-22"),
      },
    });
    const startDate = findByTestAttribute(wrapper, "datetime-start");
    expect(startDate.find("input").instance().value).toMatch("21-May-21 03:00");
    const endDate = findByTestAttribute(wrapper, "datetime-end");
    expect(endDate.find("input").instance().value).toMatch("22-May-21 03:00");
  });
});
