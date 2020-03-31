import { ContributionsPerRepo } from "models/Contributions";
import TimelineData from "models/TimelineData";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { VerticalBarChart } from "../BarCharts/BarCharts";
import LineChart from "../LineChart";
import "./ContributionsChart.scss";

interface ContributionsChartProps {
  timelineData: TimelineData;
  contributionsPerRepo: ContributionsPerRepo[];
}

function ContributionsChart(props: ContributionsChartProps) {
  const timelineData = props.timelineData.contributionsPerMonth
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

  const totalContributions = props.timelineData.totalContributions;

  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Activity
        </CardTitle>
      </CardHeader>
      <CardBody className="card-description">
        <p className="chart-subtitle">
          {totalContributions} contributions in the last year
        </p>
        <div className="timeline-wrapper">
          <LineChart data={timelineData} unit="Contributions" />
        </div>

        <p className="chart-subtitle contributions-subtitle">
          Commits per repository in the last year
        </p>
        {contributionsPerRepoData.length > 10 && (
          <p className="chart-subsubtitle">
            <em>(10 most active repositories)</em>
          </p>
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
