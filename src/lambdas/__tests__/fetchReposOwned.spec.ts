import { RepositoryOwned } from "models/Repository";
import graphql from "../../lib/graphql";
import fetchReposOwned from "../fetchReposOwned";

jest.mock("lib/graphql");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (graphql as jest.Mock).mockImplementation(() =>
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
            amountOfCodeInBytes: 37479
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
            amountOfCodeInBytes: 62834
          }
        ]
      }
    ];

    expect(graphql).toHaveBeenCalled();
    expect(repos).toEqual(expectedReposList);
  });
});
