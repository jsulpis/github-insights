import { Spinner } from "components/animation/Spinner/Spinner";
import { RepositoryContributedTo } from "models/Repository";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import BubbleChart from "../BubbleChart/BubbleChart";
// import "./RepositoriesCharts.scss";

export interface RepositoriesChartsProps {
  repos: RepositoryContributedTo[];
}

function RepositoriesCharts(props: RepositoriesChartsProps) {
  return (
    <Card className="card-user">
      <CardHeader>
        <CardTitle tag="h5">Top Repositories</CardTitle>
        <p className="card-description">
          First 30 repositories that the user recently contributed to. The contributions
          included are: commit, creation of pull request, creation of repository.
        </p>
      </CardHeader>
      <CardBody>
        <div className="repositories-wrapper">
          <BubbleChart
            data={makeChartDataFromRepos(props.repos || [])}
            xlabel="Repository size (MB)"
            ylabel="Commit count"
          />
          {!props.repos && <Spinner />}
        </div>
      </CardBody>
    </Card>
  );
}

export function makeChartDataFromRepos(repos: RepositoryContributedTo[]) {
  const isSmallScreen = !!window ? window.innerWidth <= 600 : false;
  const minRadius = 5;
  const maxRadius = isSmallScreen ? minRadius : 15;
  let minSize = 0;
  let maxSize = repos[0] ? repos[0].diskUsage : 0;
  repos.forEach(repo => {
    if (repo.diskUsage > maxSize) {
      maxSize = repo.diskUsage;
    }
    if (repo.diskUsage < minSize) {
      minSize = repo.diskUsage;
    }
  });
  return repos.map(repo => ({
    name: repo.nameWithOwner,
    x: repo.diskUsage / 1000,
    y: repo.commitCount,
    r: Math.ceil(
      minRadius +
        ((repo.diskUsage - minSize) / (maxSize - minSize)) * (maxRadius - minRadius)
    ),
    color: repo.primaryLanguage ? repo.primaryLanguage.color : "rgba(0,0,0,0.3)"
  }));
}

export default RepositoriesCharts;
