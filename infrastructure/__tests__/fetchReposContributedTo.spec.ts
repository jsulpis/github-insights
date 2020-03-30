import { RepositoryContributedTo } from "models/Repository";
import graphql from "../../lib/graphql";
import fetchReposContributedTo from "../fetchReposContributedTo";

jest.mock("lib/graphql");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (graphql as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockReposContributedTo.json"))
    );

    // When
    const repos = await fetchReposContributedTo(username);

    // Then
    const expectedReposList: RepositoryContributedTo[] = [
      {
        nameWithOwner: "jsulpis/blender-addons",
        diskUsage: 1076,
        primaryLanguage: { name: "Python", color: "#3572A5" },
        commitCount: 38
      },
      {
        nameWithOwner: "jsulpis/password-generator",
        diskUsage: 2087,
        primaryLanguage: { name: "TypeScript", color: "#2b7489" },
        commitCount: 22
      }
    ];

    expect(graphql).toHaveBeenCalled();
    expect(repos).toEqual(expectedReposList);
  });
});
