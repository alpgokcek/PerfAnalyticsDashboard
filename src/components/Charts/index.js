import React from "react";
import PropTypes from "prop-types";
import Chart from "./Chart";
import { connect } from "react-redux";
import { getMetrics } from "../../store/actions";
import TimeRangeSelector from "./TimeRangeSelector";

import "./charts.scss";

const Charts = (props) => {
  const { metrics } = props;
  const [queryFilters, setQueryFilters] = React.useState({
    start: new Date(),
    end: new Date(),
  });
  React.useEffect(() => {
    props.getMetrics(
      queryFilters.start === queryFilters.end ? {} : queryFilters
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilters]);

  const resetFilters = () => {
    setQueryFilters({
      start: new Date(),
      end: new Date(),
    });
  };

  const ttfbChart = <Chart title="TTFB" keyField="ttfb" metrics={metrics} />;
  const fcpChart = <Chart title="FCP" keyField="fcp" metrics={metrics} />;
  const domLoadChart = (
    <Chart title="DOM Load" keyField="domLoad" metrics={metrics} />
  );
  const windowLoadEventsChart = (
    <Chart
      title="Window Load Events"
      keyField="windowLoadEvents"
      metrics={metrics}
    />
  );

  return (
    <div>
      <div className="charts__time-range">
        <TimeRangeSelector
          data-test="charts-datetime"
          onChange={setQueryFilters}
          filters={queryFilters}
        />
        <div className="charts__time-range-cta-wrapper">
          <div
            className="charts__time-range-reset"
            data-test="charts-range-reset"
            onClick={resetFilters}
          >
            Reset Range
          </div>
        </div>
      </div>
      <div className="charts__container" data-test="charts-container">
        {ttfbChart}
        {fcpChart}
        {domLoadChart}
        {windowLoadEventsChart}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    metrics: state.metricsReducer.metrics,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMetrics: (filters) => {
      dispatch(getMetrics(filters));
    },
  };
};

Charts.propTypes = {
  getMetrics: PropTypes.func,
  metrics: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
