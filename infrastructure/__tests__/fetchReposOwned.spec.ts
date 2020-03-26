import { RepositoryOwned } from "models/Repository";
import httpPost from "../../lib/httpPost";
import fetchReposOwned from "../fetchReposOwned";

jest.mock("lib/httpPost");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockReposOwned.json"))
    );

    // When
    const repos = await fetchReposOwned(username);

    // Then
    const expectedReposList: RepositoryOwned[] = [
      {
        name: "blender-addons",
        starCount: 2,
        forkCount: 1,
        primaryLanguage: { name: "Python", color: "#3572A5" },
        languages: [
          {
            name: "Python",
            color: "#3572A5",
            amountOfCodeInMb: 37479
          }
        ]
      },
      {
        name: "android-modules",
        starCount: 0,
        forkCount: 0,
        primaryLanguage: { name: "Java", color: "#b07219" },
        languages: [
          {
            name: "Java",
            color: "#b07219",
            amountOfCodeInMb: 62834
          }
        ]
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
