import React from "react";
import { Card, CardBody } from "reactstrap";
import Repository from "../../../models/Repository";
import BubbleChart from "../BubbleChart";
import "./RepositoriesCharts.scss";

interface RepositoriesChartsProps {
  repos: Repository[];
}

function RepositoriesCharts(props: RepositoriesChartsProps) {
  const data = props.repos.map(repo => ({
    name: repo.name,
    x: repo.diskUsage / 1000,
    y: repo.commitCount,
    r: Math.ceil(Math.min(Math.max(Math.log(repo.diskUsage), 5), 30)),
    color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.2)"
  }));
  return (
    <Card className="card-user">
      <CardBody>
        <h4 className="chart-title">Repositories</h4>
        <div className="repositories-wrapper">
          <BubbleChart data={data} />
        </div>
      </CardBody>
    </Card>
  );
}

export default RepositoriesCharts;
