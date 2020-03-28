import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchReposContributedTo from "infrastructure/fetchReposContributedTo";
import { RepositoryContributedTo } from "models/Repository";
import reposApi from "pages/api/[username]/repos-contributed";

jest.mock("infrastructure/fetchReposContributedTo");

describe("Repos api", () => {
  it("should return repositories", async () => {
    // Given
    const MOCK_REPOS: RepositoryContributedTo[] = [
      {
        nameWithOwner: "jsulpis/android-modules",
        diskUsage: 279,
        primaryLanguage: { name: "Java", color: "#b07219" },
        commitCount: 20
      },
      {
        nameWithOwner: "jsulpis/blender-addons",
        diskUsage: 1076,
        primaryLanguage: { name: "Python", color: "#3572A5" },
        commitCount: 38
      }
    ];
    (fetchReposContributedTo as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_REPOS)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "titi" } }, res);

    // Then
    expect(fetchReposContributedTo).toHaveBeenCalledWith("titi");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_REPOS);
  });

  it("should forward errors", async () => {
    (fetchReposContributedTo as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 403, message: "Forbidden" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchReposContributedTo).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual("Forbidden");
  });
});
