import { ContributionsPerMonth } from "models/ContributionsPerMonth";
import React from "react";
import { Card, CardBody } from "reactstrap";
import LineChart from "../LineChart";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  contributions: ContributionsPerMonth[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const chartData = props.contributions
    .map(contrib => {
      return {
        label: contrib.month,
        value: contrib.contributions
      };
    })
    .slice(1);
  // the most ancient month is not displayed in the chart because
  // it can distort it if there is only a few days' worth of data

  const totalContributions = props.contributions.reduce(
    (acc, current) => acc + current.contributions,
    0
  );

  return (
    <Card className="card-user">
      <CardBody>
        <h4 className="chart-title">Activity</h4>
        <h5 className="chart-subtitle">
          {totalContributions} contributions in the last year
        </h5>
        <div className="contributions-chart-wrapper">
          <LineChart data={chartData} unit="Contributions" />
        </div>
      </CardBody>
    </Card>
  );
}

export default ContributionsChart;
