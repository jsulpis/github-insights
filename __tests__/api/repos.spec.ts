import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchRepos from "infrastructure/fetchRepos";
import reposApi from "pages/api/[username]/repos";
import Repository from "../../models/Repository";

jest.mock("infrastructure/fetchRepos");

describe("Repos api", () => {
  it("should return repositories", async () => {
    // Given
    const MOCK_REPOS: Repository[] = [
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
    (fetchRepos as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_REPOS)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "titi" } }, res);

    // Then
    expect(fetchRepos).toHaveBeenCalledWith("titi");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_REPOS);
  });

  it("should forward errors", async () => {
    (fetchRepos as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 403, message: "Forbidden" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchRepos).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual("Forbidden");
  });
});
