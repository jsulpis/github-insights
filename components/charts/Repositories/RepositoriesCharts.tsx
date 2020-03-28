import { RepositoryContributedTo } from "models/Repository";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import BubbleChart from "../BubbleChart/BubbleChart";
import "./RepositoriesCharts.scss";

export interface RepositoriesChartsProps {
  repos: RepositoryContributedTo[];
}

function RepositoriesCharts(props: RepositoriesChartsProps) {
  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5">Repositories</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="repositories-wrapper">
          <BubbleChart
            data={makeDataFromProps(props)}
            xlabel="Repo size (MB)"
            ylabel="Commit count"
          />
        </div>
      </CardBody>
    </Card>
  );
}

export function makeDataFromProps(props: RepositoriesChartsProps) {
  const isSmallScreen = !!window ? window.innerWidth <= 600 : false;
  const minRadius = 5;
  const maxRadius = isSmallScreen ? minRadius : 15;
  let minSize = 0;
  let maxSize = props.repos[0] ? props.repos[0].diskUsage : 0;
  props.repos.forEach(repo => {
    if (repo.diskUsage > maxSize) {
      maxSize = repo.diskUsage;
    }
    if (repo.diskUsage < minSize) {
      minSize = repo.diskUsage;
    }
  });
  return props.repos.map(repo => ({
    name: repo.nameWithOwner,
    x: repo.diskUsage / 1000,
    y: repo.commitCount,
    r: Math.ceil(
      minRadius +
        ((repo.diskUsage - minSize) / (maxSize - minSize)) *
          (maxRadius - minRadius)
    ),
    color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.3)"
  }));
}

export default RepositoriesCharts;
