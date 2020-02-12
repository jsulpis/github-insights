import {
  makeDataFromProps,
  RepositoriesChartsProps
} from "./RepositoriesCharts";

describe("RepositoriesCharts", () => {
  it("should construct its data from the props", () => {
    const props: RepositoriesChartsProps = {
      repos: [
        {
          name: "Repo1",
          commitCount: 12,
          diskUsage: 100,
          forkCount: 4,
          starCount: 6,
          updateDate: new Date(),
          primaryLanguage: {
            name: "HTML",
            color: "red"
          }
        },
        {
          name: "Repo2",
          commitCount: 21,
          diskUsage: 200,
          forkCount: 5,
          starCount: 7,
          updateDate: new Date(),
          primaryLanguage: null
        }
      ]
    };

    expect(makeDataFromProps(props)).toEqual([
      {
        name: "Repo1",
        color: "red",
        x: 0.1,
        y: 12,
        r: 5
      },
      {
        name: "Repo2",
        color: "rgba(0,0,0,0.2)",
        x: 0.2,
        y: 21,
        r: 6
      }
    ]);
  });
});
