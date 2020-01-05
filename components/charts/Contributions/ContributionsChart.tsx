import { MonthlyContribution } from "models/MonthlyContribution";
import React from "react";
import LineChart from "../LineChart";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  contributions: MonthlyContribution[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const chartData = props.contributions.map(contrib => {
    return {
      label: contrib.month,
      value: contrib.contributions
    };
  });
  const totalContributions = props.contributions.reduce(
    (acc, current) => acc + current.contributions,
    0
  );
  return (
    <div>
      <h4 className="chart-title">Activity</h4>
      <h5 className="chart-subtitle">
        {totalContributions} contributions in the last year
      </h5>
      <div className="contributions-chart-wrapper">
        <LineChart data={chartData} />
      </div>
    </div>
  );
}

export default ContributionsChart;
