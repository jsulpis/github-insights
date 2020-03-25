import { RepositoryOwned } from "models/Repository";
import httpPost from "../../lib/httpPost";
import fetchOwnedRepos from "../fetchOwnedRepos";

jest.mock("lib/httpPost");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockOwnedRepositories.json"))
    );

    // When
    const repos = await fetchOwnedRepos(username);

    // Then
    const expectedReposList: RepositoryOwned[] = [
      {
        name: "blender-addons",
        starCount: 2,
        forkCount: 1,
        primaryLanguage: { name: "Python", color: "#3572A5" }
      },
      {
        name: "android-modules",
        starCount: 0,
        forkCount: 0,
        primaryLanguage: { name: "Java", color: "#b07219" }
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
