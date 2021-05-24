import React from "react";
import Layout from "../../components/Layout";
import Charts from "../../components/Charts";

import "./dashboard.scss";

const Dashboard = () => {
  return (
    <Layout data-test="dashboard-wrapper">
      <div className="dashboard__container" data-test="dashboard-container">
        <Charts data-test="charts-component" />
      </div>
    </Layout>
  );
};

export default Dashboard;
