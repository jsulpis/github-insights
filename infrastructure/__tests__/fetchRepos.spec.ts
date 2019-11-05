import httpGet from "lib/httpGet";
import fetchRepos from "../fetchRepos";

jest.mock("lib/httpGet");

describe("Repo api", () => {
  it("should return a list of repositories", async () => {
    // Given
    (httpGet as jest.Mock).mockImplementation(() =>
      Promise.resolve(require("./mocks/mockRepos.json"))
    );

    // When
    const repos = await fetchRepos("jsulpis");

    // Then
    const expectedReposList = [
      {
        archived: false,
        creationDate: "2018-06-01T15:10:08Z",
        description: "A set of common Android components.",
        forked: false,
        forks: 0,
        language: "Java",
        license: "MIT",
        name: "android-modules",
        size: 279,
        stars: 0,
        updateDate: "2018-10-25T12:18:19Z",
        url: "https://github.com/jsulpis/android-modules"
      },
      {
        archived: false,
        creationDate: "2018-01-25T21:00:53Z",
        description: "My repository of add-ons for Blender.",
        forked: false,
        forks: 1,
        language: "Python",
        license: "GPL-3.0",
        name: "blender-addons",
        size: 1076,
        stars: 2,
        updateDate: "2019-06-10T15:26:14Z",
        url: "https://github.com/jsulpis/blender-addons"
      }
    ];

    expect(httpGet).toHaveBeenCalledWith(
      "https://api.github.com/users/jsulpis/repos"
    );
    expect(repos).toEqual(expectedReposList);
  });

  it("should have a username as argument", async () => {
    await fetchRepos("toto");
    expect(httpGet).toHaveBeenCalledWith(
      "https://api.github.com/users/toto/repos"
    );
  });
});
