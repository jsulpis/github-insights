import { RepositoryContributedTo } from "models/Repository";
import { makeChartDataFromRepos } from "./RepositoriesCharts";

describe("RepositoriesCharts", () => {
  it("should construct its data from the props", () => {
    const repos: RepositoryContributedTo[] = [
      {
        nameWithOwner: "owner/Repo1",
        commitCount: 12,
        diskUsage: 100,
        primaryLanguage: {
          name: "HTML",
          color: "red"
        }
      },
      {
        nameWithOwner: "owner/Repo2",
        commitCount: 21,
        diskUsage: 200,
        primaryLanguage: null
      }
    ];

    expect(makeChartDataFromRepos(repos)).toEqual([
      {
        name: "owner/Repo1",
        color: "red",
        x: 0.1,
        y: 12,
        r: 10
      },
      {
        name: "owner/Repo2",
        color: "rgba(0,0,0,0.3)",
        x: 0.2,
        y: 21,
        r: 15
      }
    ]);
  });
});
