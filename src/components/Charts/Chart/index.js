import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import EmptyContent from "./EmptyContent";

import "./chart.scss";

const Chart = (props) => {
  const { title, keyField, metrics } = props;

  const categorizedMetrics = metrics.reduce(function (r, a) {
    r[a.url] = r[a.url] || [];
    r[a.url].push(a);
    return r;
  }, Object.create(null));

  const datasets = Object.keys(categorizedMetrics).map((k) => {
    return {
      label: k,
      data: categorizedMetrics[k].map((item) => ({
        x: item.timestamp,
        y: item[keyField],
      })),
    };
  });
  const data = {
    labels: metrics.map((item) => item.timestamp).sort(),
    datasets,
  };

  return (
    <div className="chart">
      <div className="chart-title" data-test="chart-title">
        {title}
      </div>
      <div data-test={`chart-${keyField}-wrapper`}>
        {metrics.length > 0 ? (
          <Line
            className="chart-canvas"
            data={data}
            data-test={`chart-${keyField}`}
          />
        ) : (
          <EmptyContent data-test="chart-empty" />
        )}
      </div>
    </div>
  );
};

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  keyField: PropTypes.string.isRequired,
  metrics: PropTypes.array.isRequired,
};

export default Chart;
