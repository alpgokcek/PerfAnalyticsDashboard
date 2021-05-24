import React from "react";
import TimeRangeSelector from "./index";

import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttribute } from "../../../test";
import moment from "moment";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  onChange: jest.fn,
  filters: { start: new Date("2021-05-23"), end: new Date("2021-05-23") },
};

const setup = (props) => {
  return mount(<TimeRangeSelector {...props} />);
};

describe("snapshot and unit tests for TimeRangeSelector", () => {
  let wrapper, expectedDateString, date;
  beforeAll(() => {
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
    Object.defineProperty(window, "crypto", {
      value: { getRandomValues: mGetRandomValues },
    });
    date = new Date("2021-05-23").getTime();
    expectedDateString = moment(date).format("DD-MMM-YY HH:mm");
    jest.useFakeTimers("modern").setSystemTime(date);
  });

  beforeEach(() => {
    wrapper = setup(defaultProps);
  });

  it("should render correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show the current date/time", () => {
    const startDate = findByTestAttribute(wrapper, "datetime-start");
    expect(startDate.find("input").instance().value).toMatch(
      expectedDateString
    );
    const endDate = findByTestAttribute(wrapper, "datetime-end");
    expect(endDate.find("input").instance().value).toMatch(expectedDateString);
  });

  it("should update the date/time after filter change", () => {
    const startDateObj = new Date("2021-05-21");
    const endDateObj = new Date("2021-05-22");
    const startDateExpectedDateString =
      moment(startDateObj).format("DD-MMM-YY HH:mm");
    const endDateExpectedDateString =
      moment(endDateObj).format("DD-MMM-YY HH:mm");
    wrapper.setProps({
      ...defaultProps,
      filters: {
        start: startDateObj,
        end: endDateObj,
      },
    });
    const startDate = findByTestAttribute(wrapper, "datetime-start");
    expect(startDate.find("input").instance().value).toMatch(
      startDateExpectedDateString
    );
    const endDate = findByTestAttribute(wrapper, "datetime-end");
    expect(endDate.find("input").instance().value).toMatch(
      endDateExpectedDateString
    );
  });
});
