import React from "react";
import { Card, CardBody } from "reactstrap";
import Repository from "../../../models/Repository";
import BubbleChart from "../BubbleChart";
import "./RepositoriesCharts.scss";

export interface RepositoriesChartsProps {
  repos: Repository[];
}

function RepositoriesCharts(props: RepositoriesChartsProps) {
  return (
    <Card className="card-user">
      <CardBody>
        <h4 className="chart-title">Repositories</h4>
        <div className="repositories-wrapper">
          <BubbleChart data={makeDataFromProps(props)} />
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
    color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.2)"
  }));
}

export default RepositoriesCharts;
