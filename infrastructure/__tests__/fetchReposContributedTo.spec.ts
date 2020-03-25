import { RepositoryContributedTo } from "models/Repository";
import httpPost from "../../lib/httpPost";
import fetchReposContributedTo from "../fetchReposContributedTo";

jest.mock("lib/httpPost");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockReposContributedTo.json"))
    );

    // When
    const repos = await fetchReposContributedTo(username);

    // Then
    const expectedReposList: RepositoryContributedTo[] = [
      {
        name: "blender-addons",
        diskUsage: 1076,
        primaryLanguage: { name: "Python", color: "#3572A5" },
        commitCount: 38
      },
      {
        name: "password-generator",
        diskUsage: 2087,
        primaryLanguage: { name: "TypeScript", color: "#2b7489" },
        commitCount: 22
      }
    ];

    expect(httpPost).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.anything(),
      { Authorization: expect.stringContaining("bearer ") }
    );

    expect(repos).toEqual(expectedReposList);
  });
});
