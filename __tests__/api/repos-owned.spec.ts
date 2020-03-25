import MockNextApiResponse from "__tests__/api/MockNextApiResponse";
import fetchOwnedRepos from "infrastructure/fetchOwnedRepos";
import { RepositoryOwned } from "models/Repository";
import reposApi from "pages/api/[username]/repos-owned";

jest.mock("infrastructure/fetchOwnedRepos");

describe("Repos api", () => {
  it("should return repositories", async () => {
    // Given
    const MOCK_REPOS: RepositoryOwned[] = [
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
    (fetchOwnedRepos as jest.Mock).mockImplementation(() =>
      Promise.resolve(MOCK_REPOS)
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "titi" } }, res);

    // Then
    expect(fetchOwnedRepos).toHaveBeenCalledWith("titi");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(MOCK_REPOS);
  });

  it("should forward errors", async () => {
    (fetchOwnedRepos as jest.Mock).mockImplementation(() =>
      Promise.reject({ status: 403, message: "Forbidden" })
    );

    const res = new MockNextApiResponse();

    // When
    // @ts-ignore
    await reposApi({ query: { username: "toto" } }, res);

    // Then
    expect(fetchOwnedRepos).toHaveBeenCalledWith("toto");
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual("Forbidden");
  });
});
