import { ContributionsPerMonth } from "models/ContributionsPerMonth";
import { ContributionsPerRepo } from "models/ContributionsPerRepo";
import React from "react";
import { Card, CardBody } from "reactstrap";
import VerticalBarChart from "../BarCharts/VerticalBarChart";
import LineChart from "../LineChart";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  contributionsPerMonth: ContributionsPerMonth[];
  contributionsPerRepo: ContributionsPerRepo[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const timelineData = props.contributionsPerMonth
    .map(contrib => {
      return {
        label: contrib.month,
        value: contrib.contributions
      };
    })
    .slice(1);
  // the most ancient month is not displayed in the chart because
  // it can distort it if there is only a few days' worth of data

  const contributionsPerRepoData = props.contributionsPerRepo.map(contrib => {
    return {
      label: contrib.repoName,
      value: contrib.contributions,
      color: contrib.primaryLanguage.color
    };
  });

  const totalContributions = props.contributionsPerMonth.reduce(
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
        <div className="timeline-wrapper">
          <LineChart data={timelineData} unit="Contributions" />
        </div>

        <h5 className="chart-subtitle contributions-subtitle">
          Commits per repository in the last year
        </h5>
        {contributionsPerRepoData.length > 10 && (
          <p className="chart-subsubtitle">(10 most active repositories)</p>
        )}
        <div className="contributions-wrapper">
          <VerticalBarChart
            data={contributionsPerRepoData.slice(0, 10)}
            unit={"Commits"}
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default ContributionsChart;
