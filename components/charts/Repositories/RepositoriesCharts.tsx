import { RepositoryContributedTo } from "models/Repository";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import BubbleChart from "../BubbleChart";
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
  return props.repos.map(repo => ({
    name: repo.name,
    x: repo.diskUsage / 1000,
    y: repo.commitCount,
    r: Math.min(Math.max(Math.ceil(Math.log(repo.diskUsage)), 5), 30),
    color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.3)"
  }));
}

export default RepositoriesCharts;
