import { ContributionsPerRepo } from "models/Contributions";
import TimelineData from "models/TimelineData";
import { FC } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { VerticalBarChart } from "../BarCharts/BarCharts";
import LineChart from "../LineChart";
import styles from "./ContributionsChart.module.scss";

interface ContributionsChartProps {
  timelineData: TimelineData;
  contributionsPerRepo: ContributionsPerRepo[];
}

export const ContributionsChart: FC<ContributionsChartProps> = ({
  timelineData,
  contributionsPerRepo
}) => {
  const chartData = timelineData.contributionsPerMonth
    .map(contrib => {
      return {
        label: contrib.month,
        value: contrib.contributions
      };
    })
    .slice(1);
  // the most ancient month is not displayed in the chart because
  // it can distort it if there is only a few days' worth of data

  const contributionsPerRepoData = contributionsPerRepo.map(contrib => {
    return {
      label: contrib.repoName,
      value: contrib.contributions,
      color: contrib.primaryLanguage.color
    };
  });

  const totalContributions = timelineData.totalContributions;

  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Activity
        </CardTitle>
      </CardHeader>
      <CardBody className="card-description">
        <p className={styles.subtitle}>
          {totalContributions} contributions in the last year
        </p>
        <div className={styles.timeline}>
          <LineChart data={chartData} unit="Contributions" />
        </div>

        <p className={styles.contributionsSubtitle}>
          Commits per repository in the last year
        </p>
        {contributionsPerRepoData.length > 10 && (
          <p className={styles.subsubtitle}>
            <em>(10 most active repositories)</em>
          </p>
        )}
        <div className={styles.contributions}>
          <VerticalBarChart
            data={contributionsPerRepoData.slice(0, 10)}
            unit={"Commits"}
          />
        </div>
      </CardBody>
    </Card>
  );
};
