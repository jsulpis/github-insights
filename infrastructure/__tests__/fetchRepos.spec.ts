import Repository from "models/Repository";
import httpPost from "../../lib/httpPost";
import fetchRepos from "../fetchRepos";

jest.mock("lib/httpPost");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    const username = "jsulpis";
    (httpPost as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockRepos.json"))
    );

    // When
    const repos = await fetchRepos(username);

    // Then
    const expectedReposList: Repository[] = [
      {
        name: "android-modules",
        description: "A set of common Android components.",
        url: "https://github.com/jsulpis/android-modules",
        isForked: false,
        isArchived: false,
        creationDate: new Date("2018-06-01T15:10:08Z"),
        updateDate: new Date("2018-10-25T12:18:19Z"),
        diskUsage: 279,
        forkCount: 0,
        starCount: 0,
        primaryLanguage: { name: "Java", color: "#b07219" },
        license: "MIT"
      },
      {
        name: "blender-addons",
        description: "My repository of add-ons for Blender.",
        url: "https://github.com/jsulpis/blender-addons",
        isForked: false,
        isArchived: false,
        creationDate: new Date("2018-01-25T21:00:53Z"),
        updateDate: new Date("2019-06-10T15:26:14Z"),
        diskUsage: 1076,
        forkCount: 1,
        starCount: 2,
        primaryLanguage: { name: "Python", color: "#3572A5" },
        license: "GPL-3.0"
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
