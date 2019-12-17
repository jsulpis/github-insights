import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchRepos from "infrastructure/fetchRepos";
import reposApi from "pages/api/[username]/repos";

jest.mock("infrastructure/fetchRepos");

describe("Repos api", () => {
  it("should return a repo", async () => {
    // Given
    const MOCK_REPOS = [
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
    (fetchRepos as jest.Mock).mockImplementation(() => MOCK_REPOS);

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "titi" } }, res);

    // Then
    expect(fetchRepos).toHaveBeenCalledWith("titi");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_REPOS);
  });
});
