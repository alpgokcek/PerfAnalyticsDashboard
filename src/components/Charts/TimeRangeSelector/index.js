import React from "react";
import PropTypes from "prop-types";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

import "./time-range-selector.scss";

const TimeRangeSelector = (props) => {
  const { onChange, filters } = props;

  const handleDateChange = (e, isStartDate = false) => {
    if (isStartDate) onChange({ ...filters, start: e.target.value });
    else onChange({ ...filters, end: e.target.value });
  };

  return (
    <div className="time-range-selector">
      <div className="time-range-selector__container">
        <div>Start Date</div>
        <DateTimePickerComponent
          data-test="datetime-start"
          placeholder="Choose a start date and time"
          value={filters.start}
          onChange={(e) => handleDateChange(e, true)}
          format="dd-MMM-yy HH:mm"
          step={30}
        ></DateTimePickerComponent>
      </div>

      <div className="time-range-selector__container">
        <div>End Date</div>
        <DateTimePickerComponent
          data-test="datetime-end"
          placeholder="Choose an end date and time"
          value={filters.end}
          onChange={(e) => handleDateChange(e)}
          format="dd-MMM-yy HH:mm"
          step={30}
        ></DateTimePickerComponent>
      </div>
    </div>
  );
};

TimeRangeSelector.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

export default TimeRangeSelector;
